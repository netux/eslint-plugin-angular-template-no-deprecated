import { Component } from '@angular/core';
import { IsDeprecatedComponent } from '../../is-deprecated/is-deprecated.component';

@Component({
  selector: 'app-case-uses-deprecated-component-from-self',
  templateUrl: './uses-deprecated-component-from-self.component.html',
  imports: [IsDeprecatedComponent],
})
export class CaseUsesDeprecatedComponentFromSelfComponent {}
