import { Component, EventEmitter, input, Input, output, Output, signal } from '@angular/core';

const defaultSymbol = Symbol('default');

@Component({
  selector: 'lib-has-deprecated-inputs',
  templateUrl: './has-deprecated-inputs.component.html',
})
export class LibHasDeprecatedInputsComponent {
  protected readonly defaultSymbol = defaultSymbol;

  /** @deprecated */
  @Input()
  public deprecatedInput: any = defaultSymbol;

  /** @deprecated */
  @Input()
  public deprecatedInput2: any = defaultSymbol;

  /** @deprecated */
  @Output()
  public deprecatedEventEmitter = new EventEmitter();

  /** @deprecated */
  public deprecatedInputSignal = input<any>(defaultSymbol);

  /** @deprecated */
  public deprecatedInputSignal2 = input<any>(defaultSymbol);

  /** @deprecated */
  public deprecatedOutput = output();

  /** @deprecated */
  @Input()
  public deprecatedInputForTwoWayBinding: any = defaultSymbol;

  /** @deprecated */
  @Output()
  public deprecatedInputForTwoWayBindingChange = new EventEmitter();
}
