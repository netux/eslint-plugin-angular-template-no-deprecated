import { Component } from '@angular/core';
import { LibHasDeprecatedInputsComponent } from 'lib';

@Component({
  selector: 'app-case-uses-deprecated-inputs-from-lib-component',
  templateUrl: './uses-deprecated-inputs-from-lib-component.component.html',
  imports: [LibHasDeprecatedInputsComponent],
})
export class CaseUsesDeprecatedInputsFromLibComponentComponent {
  protected uhOh = 'Uh oh';
  protected noop() {}
}
