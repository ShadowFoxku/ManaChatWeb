import { ChangeDetectorRef, Directive, inject } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

/**
 * Abstract base for all ControlValueAccessor components.
 * Handles the boilerplate: value state, disabled state, CDR, and CVA hooks.
 *
 * Usage:
 *   export class MyInputComponent extends BaseControl<string> {
 *     defaultValue() { return ''; }
 *   }
 */
@Directive()
export abstract class BaseControl<T> implements ControlValueAccessor {
  value: T = this.defaultValue();
  isDisabled = false;

  protected readonly cdr = inject(ChangeDetectorRef);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: T) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  /** Return the empty/initial value for this control's type. */
  abstract defaultValue(): T;

  writeValue(val: T): void {
    this.value = val ?? this.defaultValue();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.cdr.markForCheck();
  }
}
