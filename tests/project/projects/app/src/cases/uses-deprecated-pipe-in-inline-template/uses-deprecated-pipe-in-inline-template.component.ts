import { Component } from '@angular/core';
import { IsDeprecatedPipe } from '../../is-deprecated.pipe';

@Component({
  selector: 'app-case-uses-deprecated-pipe-in-inline-template',
  template: `<span>{{ 'pipe' | isDeprecated }}</span> | inline template`,
  imports: [IsDeprecatedPipe],
})
export class CaseUsesDeprecatedPipeInInlineTemplateComponent {}
