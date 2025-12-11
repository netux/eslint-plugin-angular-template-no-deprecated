import { Component } from '@angular/core';
import { HasDeprecatedInputsComponent } from '../../has-deprecated-inputs/has-deprecated-inputs.component';

@Component({
  selector: 'app-case-uses-deprecated-inputs-from-self-component',
  templateUrl: './uses-deprecated-inputs-from-self-component.component.html',
  imports: [HasDeprecatedInputsComponent],
})
export class CaseUsesDeprecatedInputsFromSelfComponentComponent {
  protected uhOh = 'Uh oh';
  protected noop() {}
}
