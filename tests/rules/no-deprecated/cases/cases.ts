import fs from 'node:fs';
import path from 'node:path';
import type {
	InvalidTestCase,
	ValidTestCase
} from '@typescript-eslint/rule-tester';
import {
	MESSAGE_DEPRECATED_COMPONENT,
	MESSAGE_DEPRECATED_PROPERTY,
	type MessageIds,
	type Options
} from '../../../../src/rules/no-deprecated';
import assert from 'node:assert';

export const valid: readonly (string | ValidTestCase<Options>)[] = [
	{
		name: 'Does not find any deprecated components',
		...fromFSTemplateCase('does-not-use-anything-deprecated')
	}
];

export const invalid: readonly InvalidTestCase<MessageIds, Options>[] = [
	{
		name: 'Finds usage of a deprecated component declared in the same Angular application',
		...fromFSTemplateCase('uses-deprecated-component-from-self'),
		errors: [
			{
				messageId: MESSAGE_DEPRECATED_COMPONENT,
				data: {
					componentName: 'IsDeprecatedComponent'
				}
			}
		]
	},
	{
		name: 'Finds usage of a deprecated component declared in an external library',
		...fromFSTemplateCase('uses-deprecated-component-from-lib'),
		errors: [
			{
				messageId: MESSAGE_DEPRECATED_COMPONENT,
				data: {
					componentName: 'LibIsDeprecatedComponent'
				}
			}
		]
	},
	{
		name: 'Finds usage of a deprecated component inside an inline template, declared in the same Angular application',
		...fromFSTemplateCase('uses-deprecated-component-in-inline-template', {
			ext: '.ts'
		}),
		errors: [
			{
				messageId: MESSAGE_DEPRECATED_COMPONENT,
				data: {
					componentName: 'IsDeprecatedComponent'
				}
			}
		]
	},
	...[
		{
			testName:
				'Finds deprecated inputs, input signals, event emitters, and outputs usages in component declared in the same Angular application',
			caseComponentStem: 'uses-deprecated-inputs-from-self-component',
			componentClassName: 'HasDeprecatedInputsComponent'
		},
		{
			testName:
				'Finds deprecated inputs, input signals, event emitters, and outputs usages in component declared in an external library',
			caseComponentStem: 'uses-deprecated-inputs-from-lib-component',
			componentClassName: 'LibHasDeprecatedInputsComponent'
		}
	].map(
		({
			testName,
			caseComponentStem,
			componentClassName
		}): InvalidTestCase<MessageIds, Options> => ({
			name: testName,
			...fromFSTemplateCase(caseComponentStem),
			errors: [
				{
					messageId: MESSAGE_DEPRECATED_PROPERTY,
					data: {
						propertyName: `${componentClassName}.deprecatedInput`
					}
				},
				{
					messageId: MESSAGE_DEPRECATED_PROPERTY,
					data: {
						propertyName: `${componentClassName}.deprecatedInput2`
					}
				},
				{
					messageId: MESSAGE_DEPRECATED_PROPERTY,
					data: {
						propertyName: `${componentClassName}.deprecatedEventEmitter`
					}
				},
				{
					messageId: MESSAGE_DEPRECATED_PROPERTY,
					data: {
						propertyName: `${componentClassName}.deprecatedInputSignal`
					}
				},
				{
					messageId: MESSAGE_DEPRECATED_PROPERTY,
					data: {
						propertyName: `${componentClassName}.deprecatedInputSignal2`
					}
				},
				{
					messageId: MESSAGE_DEPRECATED_PROPERTY,
					data: {
						propertyName: `${componentClassName}.deprecatedOutput`
					}
				},
				{
					messageId: MESSAGE_DEPRECATED_PROPERTY,
					data: {
						propertyName: `${componentClassName}.deprecatedInputForTwoWayBinding`
					}
				},
				{
					messageId: MESSAGE_DEPRECATED_PROPERTY,
					data: {
						propertyName: `${componentClassName}.deprecatedInputForTwoWayBindingChange`
					}
				}
			]
		})
	)
];

function fromFSTemplate(
	relativeTemplatePath: string
): Pick<
	ValidTestCase<Options> & InvalidTestCase<MessageIds, Options>,
	'code' | 'filename'
> {
	const absoluteTemplatePath = path.resolve(__dirname, relativeTemplatePath);

	let code = fs.readFileSync(absoluteTemplatePath, {
		encoding: 'utf-8'
	});

	switch (path.extname(absoluteTemplatePath)) {
		case '.html': {
			break;
		}
		case '.ts': {
			const templateMatch = code.match(
				/template: (?<_quote>["`'])(?<templateCode>[^`]*)\k<_quote>/
			);
			assert(
				templateMatch != null,
				`File at ${absoluteTemplatePath} has no inline template`
			);

			code = templateMatch.groups!.templateCode;
			break;
		}
		default: {
			throw new Error(
				`Invalid file extension ${path.extname(absoluteTemplatePath)}`
			);
		}
	}

	return {
		code,
		filename: absoluteTemplatePath
	} satisfies ValidTestCase<Options>;
}

function fromFSTemplateCase(
	fileStem: string,
	{ ext = '.html' }: { ext?: string } = {}
): ReturnType<typeof fromFSTemplate> {
	return fromFSTemplate(
		`../../../project/projects/app/src/cases/${fileStem}/${fileStem}.component${ext}`
	);
}
