import { Component } from '@angular/core';
import { LibHasDeprecatedInputsDirective } from 'lib';

@Component({
  selector: 'app-case-uses-deprecated-inputs-from-lib-directive',
  templateUrl: './uses-deprecated-inputs-from-lib-directive.component.html',
  imports: [LibHasDeprecatedInputsDirective],
})
export class CaseUsesDeprecatedInputsFromLibDirectiveComponent {
  protected uhOh = 'Uh oh';
  protected noop() {}
}
