# eslint-plugin-angular-template-no-deprecated

An ESLint plugin that highlights usages of deprecated Components or Component properties inside Angular Templates. Similar to [`@typescript-eslint/no-deprecated`](https://typescript-eslint.io/rules/no-deprecated) but for Angular templates!

Requires [angular-eslint](https://www.npmjs.com/package/angular-eslint).

> ![NOTE]
> This plugin does no dependency injection resolution. It simply scans the whole TypeScript project in search of component definitions that have the `@deprecated` JSDoc.
>
> Because of this, you may see false-positives or false-negatives for cases when a component is not actually importer, or is imported with a different prefix selector.

## Configuration

### Flat Config (ESLint 9+) – Manual

File: _eslint.config.js_

```ts
import angularTemplateParser from '@angular-eslint/template-parser';
import angularTemplateNoDeprecated from 'eslint-plugin-angular-template-no-deprecated';
import { defineConfig } from 'eslint/config';

export default [
  // ...
  {
    files: ['**/*.html'],

    languageOptions: {
      parser: angularTemplateParser
    },

    plugins: {
      'angular-template-no-deprecated': angularTemplateNoDeprecated
    },

    rules: {
      'angular-template-no-deprecated/no-deprecated': 'warn',
    }
  }
];
```

### Flat Config (ESLint 9+) – Using recommended

File: _eslint.config.js_

```ts
import angularTemplateParser from '@angular-eslint/template-parser';
import angularTemplateNoDeprecated from 'eslint-plugin-angular-template-no-deprecated';
import { defineConfig } from 'eslint/config';

export default [
  // ...
  angularTemplateNoDeprecated.configs.recommended
]
```

### Legacy Config (ESLint 8 and below)

File: _.eslintrc_

```json
{
  "plugins": ["angular-template-no-deprecated"],
  "rules": {
    "angular-template-no-deprecated/no-deprecated": "warn"
  }
}
```

## Versioning

| Plugin version | Angular version | Angular ESLint version |
| :------------: | :-------------: | :--------------------: |
|    ^20.0.0     |    ^20.3.15     |        ^20.7.0         |

## Roadtrip

- [x] Detect deprecated Components
  - [x] Detect deprecated Component properties
- [ ] Detect deprecated Directives
  - [ ] Detect deprecated Directive properties
- [ ] Detect deprecates Pipes
  - [ ] Detect deprecated Pipe properties
- [ ] Some sort of dependency injection resolution to avoid false-positives/false-negatives
