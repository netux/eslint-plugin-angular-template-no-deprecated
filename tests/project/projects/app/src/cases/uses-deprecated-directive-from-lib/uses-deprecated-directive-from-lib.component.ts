import { Component } from '@angular/core';
import { LibIsDeprecatedDirective } from 'lib';

@Component({
  selector: 'app-case-uses-deprecated-directive-from-lib',
  templateUrl: './uses-deprecated-directive-from-lib.component.html',
  imports: [LibIsDeprecatedDirective],
})
export class CaseUsesDeprecatedDirectiveFromLibComponent {}
