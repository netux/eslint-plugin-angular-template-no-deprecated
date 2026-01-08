### 20.1.0 (2026-01-08)

##### Documentation Changes

* **CHANGELOG:**  add changelog for v20.0.0 (2110a047)
* **README:**  update Roadmap with newly completed items (a4184683)

##### New Features

* **npm:**  add and configure generate-changelog (1e03e6f7)
* **vscode:**  recommend the official ESLint extension (a4333222)
* **test project/eslint:**  install and configure ESLint to run our plugin (c9fbda97)
*  add support for detecting deprecated pipe usages (f12e45fd)
*  detect structural directives (*ngIf, *ngFor, etc.) (416cd795)
*  add support for detecting deprecated directives and deprecated directive properties usages (e5d66c0b)

##### Bug Fixes

* **README:**  rename "Roadtrip" heading → "Roadmap" (e220ab2a)
* **tsconfig:**  set `inlineSourceMap` (cb6dfcc7)
* **npm ignore:**  correctly ignore all in **/dist/ (fa25bb9f)

##### Code Style Changes

* **mapping store:**  "findAngularDirectives" → "findAngularDirective" (112e04ed)
* **test project/app:**  remove unused signal (779f3273)
* **test project:**  remove leftover compiled .js files (4e4e8351)
* **vitest config:**  remove unused node:path import (e41c643a)

### 20.0.0 (2025-12-11)

*  Initial release
*  Bootstrap project, implement plugin
*  Support for Angular 20
*  Detect deprecated Component usages in Angular templates
*  Detect deprecated component property usages in Angular templates
