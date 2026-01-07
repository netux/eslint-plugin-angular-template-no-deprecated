import { Directive, HostBinding } from '@angular/core';

/** @deprecated */
@Directive({
  selector: '[is-deprecated], [isDeprecated]',
})
export class IsDeprecatedDirective {
  @HostBinding('style.color')
  public get color() {
    return 'violet';
  }
}
