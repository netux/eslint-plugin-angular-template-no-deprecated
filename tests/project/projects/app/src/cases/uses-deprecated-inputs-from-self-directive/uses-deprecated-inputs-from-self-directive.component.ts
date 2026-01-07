import { Component } from '@angular/core';
import { HasDeprecatedInputsDirective } from '../../has-deprecated-inputs.directive';

@Component({
  selector: 'app-case-uses-deprecated-inputs-from-self-directive',
  templateUrl: './uses-deprecated-inputs-from-self-directive.component.html',
  imports: [HasDeprecatedInputsDirective],
})
export class CaseUsesDeprecatedInputsFromSelfDirectiveComponent {
  protected uhOh = 'Uh oh';
}
