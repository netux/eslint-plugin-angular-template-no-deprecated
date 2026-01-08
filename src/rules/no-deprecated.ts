import { getTemplateParserServices } from '@angular-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import {
	findAngularComponentInAllMappings,
	findAngularDirectiveInAllMappings,
	findAngularPipeInAllMappings,
	tryEnsureMappings
} from '../lib/mapping-store';
import { findComponentTsFileFromTemplateFile } from '../lib/find-files';
import type {
	BindingPipe as TmplAstBindingPipe,
	TmplAstElement,
	TmplAstTemplate
} from '@angular/compiler';
import { convertAstSpanToLoc } from '../util/template-parser-services';

export const RULE_NAME = 'no-deprecated';
export const MESSAGE_DEPRECATED_COMPONENT = 'deprecatedComponent';
export const MESSAGE_DEPRECATED_DIRECTIVE = 'deprecatedDirective';
export const MESSAGE_DEPRECATED_PIPE = 'deprecatedPipe';
export const MESSAGE_DEPRECATED_PROPERTY = 'deprecatedProperty';

export type Options = [];
export type MessageIds =
	| typeof MESSAGE_DEPRECATED_COMPONENT
	| typeof MESSAGE_DEPRECATED_DIRECTIVE
	| typeof MESSAGE_DEPRECATED_PIPE
	| typeof MESSAGE_DEPRECATED_PROPERTY;

export const rule = ESLintUtils.RuleCreator.withoutDocs<Options, MessageIds>({
	// name: RULE_NAME,
	meta: {
		type: 'problem',
		docs: {
			description: 'A thing is deprecated'
		},
		schema: [],
		messages: {
			[MESSAGE_DEPRECATED_COMPONENT]:
				'Component {{ componentName }} is deprecated',
			[MESSAGE_DEPRECATED_DIRECTIVE]:
				'Directive {{ directiveName }} is deprecated',
			[MESSAGE_DEPRECATED_PIPE]: 'Pipe {{ pipeName }} is deprecated',
			[MESSAGE_DEPRECATED_PROPERTY]: 'Property {{ propertyName }} is deprecated'
		}
	},
	defaultOptions: [],
	create(context) {
		const angularParserServices = getTemplateParserServices(context);

		function handleElementOrTemplateNode(
			elementNode:
				| (TmplAstElement & { type: 'Element' })
				| (TmplAstTemplate & { type: 'Template' })
		) {
			const tsFilePath = findComponentTsFileFromTemplateFile(context.filename);

			if (!tsFilePath) {
				return;
			}

			if (!tryEnsureMappings(tsFilePath)) {
				return;
			}

			const component =
				elementNode.type === 'Element'
					? // TODO(netux): support attribute selectors (`[my-component]` or `element [my-component]`)
					  findAngularComponentInAllMappings(elementNode.name)
					: null;

			if (component != null && component.isDeprecated) {
				const loc = angularParserServices.convertNodeSourceSpanToLoc(
					// TODO(netux): limit this to just the tag name?
					elementNode.startSourceSpan
				);

				context.report({
					loc,
					messageId: MESSAGE_DEPRECATED_COMPONENT,
					data: {
						componentName: component.className
					}
				});
			}

			const allElementAttributeNodes = [
				...elementNode.attributes,
				...elementNode.inputs,
				...elementNode.outputs,
				...(elementNode.type === 'Template' ? elementNode.templateAttrs : [])
			];

			const directives = allElementAttributeNodes
				.map((attributeNode) => {
					const elementName =
						elementNode.type === 'Element' ? elementNode.name : 'ng-template';

					const elementMapping =
						findAngularDirectiveInAllMappings(
							// Prioritize element-specific attributes
							`${elementName} [${attributeNode.name}]`
						) || findAngularDirectiveInAllMappings(`[${attributeNode.name}]`);

					return {
						elementMapping,

						// Store attributeNode for detecting if the current attribute
						// node is the one that declares the use of the directive.
						//
						// This is a bit more foolproof than checking the attribute's
						// selectors again.
						attributeNode
					};
				})
				.filter((directive) => directive.elementMapping != null);

			for (const attributeNode of allElementAttributeNodes) {
				if (component != null) {
					const property = component.properties[attributeNode.name];
					if (property == null) {
						continue;
					}

					if (property.isDeprecated) {
						const loc = angularParserServices.convertNodeSourceSpanToLoc(
							attributeNode.keySpan || attributeNode.sourceSpan
						);

						context.report({
							loc,
							messageId: MESSAGE_DEPRECATED_PROPERTY,
							data: {
								propertyName: `${component.className}.${attributeNode.name}`
							}
						});
					}
				}

				for (const directive of directives) {
					const loc = angularParserServices.convertNodeSourceSpanToLoc(
						attributeNode.keySpan || attributeNode.sourceSpan
					);

					if (
						directive.attributeNode === attributeNode &&
						directive.elementMapping!.isDeprecated
					) {
						context.report({
							loc,
							messageId: MESSAGE_DEPRECATED_DIRECTIVE,
							data: {
								directiveName: directive.elementMapping!.className
							}
						});
					} else if (
						directive.elementMapping!.properties[attributeNode.name]
							?.isDeprecated
					) {
						context.report({
							loc,
							messageId: MESSAGE_DEPRECATED_PROPERTY,
							data: {
								propertyName: `${directive.elementMapping!.className}.${
									attributeNode.name
								}`
							}
						});
					}
				}
			}
		}

		function handlePipeAst(pipeAst: TmplAstBindingPipe) {
			const pipe = findAngularPipeInAllMappings(pipeAst.name);
			if (pipe == null || !pipe.isDeprecated) {
				return;
			}

			context.report({
				loc: convertAstSpanToLoc(pipeAst, pipeAst.nameSpan) ?? {
					line: 0,
					column: 0
				},
				messageId: MESSAGE_DEPRECATED_PIPE,
				data: {
					pipeName: pipe.className
				}
			});
		}

		return {
			Element: handleElementOrTemplateNode,
			Template: handleElementOrTemplateNode,
			BindingPipe: handlePipeAst
		};
	}
});
