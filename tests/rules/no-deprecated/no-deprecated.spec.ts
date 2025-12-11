import { RuleTester } from '@angular-eslint/test-utils';
import * as templateParser from '@angular-eslint/template-parser';
import { valid, invalid } from './cases';
import { rule, RULE_NAME } from '../../../src/rules/no-deprecated';

const ruleTester = new RuleTester({
	languageOptions: {
		parser: templateParser
	}
});

ruleTester.run(RULE_NAME, rule, {
	valid,
	invalid
});
