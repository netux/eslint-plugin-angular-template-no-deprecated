import { Directive, HostBinding, Input } from '@angular/core';

const defaultSymbol = Symbol('default');

@Directive({
  selector: '[has-deprecated-inputs], [hasDeprecatedInputs]',
})
export class HasDeprecatedInputsDirective {
  protected readonly defaultSymbol = defaultSymbol;

  @HostBinding('style.color')
  public get color() {
    return 'violet';
  }

  @HostBinding('style.text-decoration')
  public get textDecoration() {
    return this.deprecatedInput === defaultSymbol ? 'strikethrough' : 'none';
  }

  /** @deprecated */
  @Input()
  public deprecatedInput: any = defaultSymbol;
}
