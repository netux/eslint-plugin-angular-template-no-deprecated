import { Component } from '@angular/core';
import { IsDeprecatedDirective } from '../../is-deprecated.directive';

@Component({
  selector: 'app-case-uses-deprecated-directive-in-inline-template',
  template: '<span isDeprecated>directive</span> | inline template',
  imports: [IsDeprecatedDirective],
})
export class CaseUsesDeprecatedDirectiveInInlineTemplateComponent {}
