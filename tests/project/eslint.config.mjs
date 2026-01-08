import angularTemplateParser from '@angular-eslint/template-parser';
import angularTemplateNoDeprecated from 'eslint-plugin-angular-template-no-deprecated';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.html'],
    ignores: [
      'dist/**/*'
    ],

    languageOptions: {
      parser: angularTemplateParser
    },

    plugins: {
      // @ts-ignore TODO(netux): figure out why the types don't match
      'angular-template-no-deprecated': angularTemplateNoDeprecated
    },

    rules: {
      'angular-template-no-deprecated/no-deprecated': 'warn',
    }
  },
]);
