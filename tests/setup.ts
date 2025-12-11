import path from 'node:path';
import { execSync } from 'node:child_process';
import { RuleTester } from '@angular-eslint/test-utils';
import { it, describe, afterAll } from 'vitest';

execSync('npm run build:lib', {
	cwd: path.resolve(__dirname, './project'),
	stdio: 'pipe'
});

RuleTester.it = it;
RuleTester.describe = describe;
RuleTester.afterAll = afterAll;
