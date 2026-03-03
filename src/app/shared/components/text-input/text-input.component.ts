import {
  ChangeDetectionStrategy,
  Component,
  forwardRef, input,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '../base/base-control';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [],
  templateUrl: './text-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent extends BaseControl<string> {
  id = input('');
  name = input('');
  type = input<'text' | 'email' | 'password' | 'tel'>('text');
  placeholder = input('');
  icon = input('');
  hasError = input<boolean | null>(false);
  autocomplete = input<'on' | 'off'>('off');

  defaultValue(): string {
    return '';
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
    this.cdr.markForCheck();
  }
}
