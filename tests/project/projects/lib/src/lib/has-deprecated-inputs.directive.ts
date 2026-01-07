import { Directive, HostBinding, Input } from '@angular/core';

const defaultSymbol = Symbol('default');

@Directive({
  selector: '[lib-has-deprecated-inputs], [libHasDeprecatedInputs]',
})
export class LibHasDeprecatedInputsDirective {
  protected readonly defaultSymbol = defaultSymbol;

  @HostBinding('style.color')
  public get color() {
    return 'blue';
  }

  @HostBinding('style.text-decoration')
  public get textDecoration() {
    return this.deprecatedInput === defaultSymbol ? 'strikethrough' : 'none';
  }

  /** @deprecated */
  @Input()
  public deprecatedInput: any = defaultSymbol;
}
