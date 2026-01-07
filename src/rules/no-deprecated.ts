import { getTemplateParserServices } from '@angular-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import {
	findAngularComponentInAllMappings,
	findAngularDirectivesAllMappings,
	tryEnsureMappings
} from '../lib/mapping-store';
import { findComponentTsFileFromTemplateFile } from '../lib/find-files';
import type { TmplAstElement, TmplAstTemplate } from '@angular/compiler';

export const RULE_NAME = 'no-deprecated';
export const MESSAGE_DEPRECATED_COMPONENT = 'deprecatedComponent';
export const MESSAGE_DEPRECATED_DIRECTIVE = 'deprecatedDirective';
export const MESSAGE_DEPRECATED_PROPERTY = 'deprecatedProperty';

export type Options = [];
export type MessageIds =
	| typeof MESSAGE_DEPRECATED_COMPONENT
	| typeof MESSAGE_DEPRECATED_DIRECTIVE
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
			[MESSAGE_DEPRECATED_PROPERTY]: 'Property {{ propertyName }} is deprecated'
		}
	},
	defaultOptions: [],
	create(context) {
		const angularParserServices = getTemplateParserServices(context);

		return {
			Element(elementNode: TmplAstElement) {
				const tsFilePath = findComponentTsFileFromTemplateFile(
					context.filename
				);

				if (!tsFilePath) {
					return;
				}

				if (!tryEnsureMappings(tsFilePath)) {
					return;
				}

				const component = findAngularComponentInAllMappings(elementNode.name);

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
					...elementNode.outputs
				];

				const directives = allElementAttributeNodes
					.map((attributeNode) => {
						const elementMapping =
							findAngularDirectivesAllMappings(
								// Prioritize element-specific attributes
								`${elementNode.name} [${attributeNode.name}]`
							) || findAngularDirectivesAllMappings(`[${attributeNode.name}]`);

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
		};
	}
});
