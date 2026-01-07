import { Component, signal } from '@angular/core';
import { CaseDoesNotUseAnythingDeprecatedComponent } from '../cases/does-not-use-anything-deprecated/does-not-use-anything-deprecated.component';
import { CaseUsesDeprecatedComponentFromSelfComponent } from '../cases/uses-deprecated-component-from-self/uses-deprecated-component-from-self.component';
import { CaseUsesDeprecatedComponentFromLibComponent } from '../cases/uses-deprecated-component-from-lib/uses-deprecated-component-from-lib.component';
import { CaseUsesDeprecatedComponentInInlineTemplateComponent } from '../cases/uses-deprecated-component-in-inline-template/uses-deprecated-component-in-inline-template.component';
import { CaseUsesDeprecatedInputsFromSelfComponentComponent } from '../cases/uses-deprecated-inputs-from-self-component/uses-deprecated-inputs-from-self-component.component';
import { CaseUsesDeprecatedInputsFromLibComponentComponent } from '../cases/uses-deprecated-inputs-from-lib-component/uses-deprecated-inputs-from-lib-component.component';
import { CaseUsesDeprecatedDirectiveFromSelfComponent } from '../cases/uses-deprecated-directive-from-self/uses-deprecated-directive-from-self.component';
import { CaseUsesDeprecatedDirectiveFromLibComponent } from '../cases/uses-deprecated-directive-from-lib/uses-deprecated-directive-from-lib.component';
import { CaseUsesDeprecatedDirectiveInInlineTemplateComponent } from '../cases/uses-deprecated-directive-in-inline-template/uses-deprecated-directive-in-inline-template.component';
import { CaseUsesDeprecatedDirectiveFromAngularCommonsComponent } from '../cases/uses-deprecated-directive-from-angular-commons/uses-deprecated-directive-from-angular-commons.component';
import { CaseUsesDeprecatedInputsFromSelfDirectiveComponent } from '../cases/uses-deprecated-inputs-from-self-directive/uses-deprecated-inputs-from-self-directive.component';
import { CaseUsesDeprecatedInputsFromLibDirectiveComponent } from '../cases/uses-deprecated-inputs-from-lib-directive/uses-deprecated-inputs-from-lib-directive.component';

@Component({
  selector: 'app-root',
  imports: [
    CaseDoesNotUseAnythingDeprecatedComponent,
    CaseUsesDeprecatedComponentFromSelfComponent,
    CaseUsesDeprecatedComponentFromLibComponent,
    CaseUsesDeprecatedComponentInInlineTemplateComponent,
    CaseUsesDeprecatedInputsFromSelfComponentComponent,
    CaseUsesDeprecatedInputsFromLibComponentComponent,
    CaseUsesDeprecatedDirectiveInInlineTemplateComponent,
    CaseUsesDeprecatedDirectiveFromSelfComponent,
    CaseUsesDeprecatedDirectiveFromLibComponent,
    CaseUsesDeprecatedDirectiveFromAngularCommonsComponent,
    CaseUsesDeprecatedInputsFromSelfDirectiveComponent,
    CaseUsesDeprecatedInputsFromLibDirectiveComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('project');
}
