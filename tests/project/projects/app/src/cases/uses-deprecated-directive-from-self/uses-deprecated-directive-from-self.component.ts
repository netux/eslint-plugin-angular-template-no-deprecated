import { Component } from '@angular/core';
import { IsDeprecatedDirective } from '../../is-deprecated.directive';

@Component({
  selector: 'app-case-uses-deprecated-directive-from-self',
  templateUrl: './uses-deprecated-directive-from-self.component.html',
  imports: [IsDeprecatedDirective],
})
export class CaseUsesDeprecatedDirectiveFromSelfComponent {}
