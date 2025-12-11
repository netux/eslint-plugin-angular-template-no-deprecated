import { getTemplateParserServices } from '@angular-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import {
	findAngularComponentInAllMappings,
	tryEnsureMappings
} from '../lib/mapping-store';
import { findComponentTsFileFromTemplateFile } from '../lib/find-files';
import type { TmplAstElement } from '@angular/compiler';

export const RULE_NAME = 'no-deprecated';
export const MESSAGE_DEPRECATED_COMPONENT = 'deprecatedComponent';
export const MESSAGE_DEPRECATED_PROPERTY = 'deprecatedProperty';

export type Options = [];
export type MessageIds =
	| typeof MESSAGE_DEPRECATED_COMPONENT
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
				if (component == null) {
					return;
				}

				if (component.isDeprecated) {
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

				for (const attributeNode of [
					...elementNode.attributes,
					...elementNode.inputs,
					...elementNode.outputs
				]) {
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
			}
		};
	}
});
