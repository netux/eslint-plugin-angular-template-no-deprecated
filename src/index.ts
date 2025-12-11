import angularTemplateParser from '@angular-eslint/template-parser';
import {
	RULE_NAME as NO_DEPRECATED_RULE_NAME,
	rule as noDeprecatedRule
} from './rules/no-deprecated';
import packageJson from '../package.json';
import type { TSESLint } from '@typescript-eslint/utils';

const pluginNamespace = packageJson.name.replace(/^eslint-plugin-/, '');

export const meta: TSESLint.FlatConfig.PluginMeta = {
	name: packageJson.name,
	version: packageJson.version
};

export const rules: Record<string, TSESLint.LooseRuleDefinition> = {
	[NO_DEPRECATED_RULE_NAME]: noDeprecatedRule
};

const plugin: TSESLint.FlatConfig.Plugin = {
	meta,
	rules
};

export const configs: TSESLint.FlatConfig.SharedConfigs = {
	recommended: {
		languageOptions: {
			parser: angularTemplateParser
		},
		plugins: {
			[pluginNamespace]: plugin
		},
		rules: {
			[`${pluginNamespace}/${NO_DEPRECATED_RULE_NAME}`]: 'warn'
		}
	}
};
plugin.configs = configs;

export default plugin;
