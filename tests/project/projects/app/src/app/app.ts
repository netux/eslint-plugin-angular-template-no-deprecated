import { Component, signal } from '@angular/core';
import { CaseDoesNotUseAnythingDeprecatedComponent } from '../cases/does-not-use-anything-deprecated/does-not-use-anything-deprecated.component';
import { CaseUsesDeprecatedComponentFromSelfComponent } from '../cases/uses-deprecated-component-from-self/uses-deprecated-component-from-self.component';
import { CaseUsesDeprecatedComponentFromLibComponent } from '../cases/uses-deprecated-component-from-lib/uses-deprecated-component-from-lib.component';
import { CaseUsesDeprecatedComponentInInlineTemplateComponent } from '../cases/uses-deprecated-component-in-inline-template/uses-deprecated-component-in-inline-template.component';
import { CaseUsesDeprecatedInputsFromSelfComponentComponent } from '../cases/uses-deprecated-inputs-from-self-component/uses-deprecated-inputs-from-self-component.component';
import { CaseUsesDeprecatedInputsFromLibComponentComponent } from '../cases/uses-deprecated-inputs-from-lib-component/uses-deprecated-inputs-from-lib-component.component';

@Component({
  selector: 'app-root',
  imports: [
    CaseDoesNotUseAnythingDeprecatedComponent,
    CaseUsesDeprecatedComponentFromSelfComponent,
    CaseUsesDeprecatedComponentFromLibComponent,
    CaseUsesDeprecatedComponentInInlineTemplateComponent,
    CaseUsesDeprecatedInputsFromSelfComponentComponent,
    CaseUsesDeprecatedInputsFromLibComponentComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('project');
}
