import { Component } from '@angular/core';
import { LibIsDeprecatedPipe } from 'lib';

@Component({
  selector: 'app-case-uses-deprecated-pipe-from-lib',
  templateUrl: './uses-deprecated-pipe-from-lib.component.html',
  imports: [LibIsDeprecatedPipe],
})
export class CaseUsesDeprecatedPipeFromLibComponent {}
