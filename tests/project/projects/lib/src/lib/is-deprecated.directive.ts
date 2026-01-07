import { Directive, HostBinding } from '@angular/core';

/** @deprecated */
@Directive({
  selector: '[lib-is-deprecated], [libIsDeprecated]',
})
export class LibIsDeprecatedDirective {
  @HostBinding('style.color')
  public get color() {
    return 'blue';
  }
}
