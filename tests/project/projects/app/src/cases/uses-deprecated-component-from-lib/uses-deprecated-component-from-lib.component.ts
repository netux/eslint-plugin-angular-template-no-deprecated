import { Component } from '@angular/core';
import { LibIsDeprecatedComponent } from 'lib';

@Component({
  selector: 'app-case-uses-deprecated-component-from-lib',
  templateUrl: './uses-deprecated-component-from-lib.component.html',
  imports: [LibIsDeprecatedComponent],
})
export class CaseUsesDeprecatedComponentFromLibComponent {}
