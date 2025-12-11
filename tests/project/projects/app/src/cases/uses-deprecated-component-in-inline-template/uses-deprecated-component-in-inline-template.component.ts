import { Component } from '@angular/core';
import { IsDeprecatedComponent } from '../../is-deprecated/is-deprecated.component';

@Component({
  selector: 'app-case-uses-deprecated-component-in-inline-template',
  template: '<app-is-deprecated></app-is-deprecated> | inline template',
  imports: [IsDeprecatedComponent],
})
export class CaseUsesDeprecatedComponentInInlineTemplateComponent {}
