import {
  ChangeDetectionStrategy,
  Component,
  forwardRef, input,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '../base/base-control';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent extends BaseControl<boolean> {
  id = input('');
  name = input('');
  label = input('');

  get checked(): boolean {
    return this.value;
  }

  defaultValue(): boolean {
    return false;
  }

  toggle(): void {
    if (this.isDisabled) return;
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
