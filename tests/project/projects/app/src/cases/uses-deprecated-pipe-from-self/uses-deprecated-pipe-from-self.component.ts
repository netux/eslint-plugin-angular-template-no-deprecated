import { Component } from '@angular/core';
import { IsDeprecatedPipe } from '../../is-deprecated.pipe';

@Component({
  selector: 'app-case-uses-deprecated-pipe-from-self',
  templateUrl: './uses-deprecated-pipe-from-self.component.html',
  imports: [IsDeprecatedPipe],
})
export class CaseUsesDeprecatedPipeFromSelfComponent {}
