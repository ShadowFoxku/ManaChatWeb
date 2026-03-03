import {
  ChangeDetectionStrategy,
  Component,
  forwardRef, input,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BaseControl } from '../base/base-control';

export interface PhoneValue {
  prefix: string;
  number: string;
}

export const PHONE_PREFIXES = [
  { flag: '🇺🇸', code: '+1',  label: '+1'  },
  { flag: '🇬🇧', code: '+44', label: '+44' },
  { flag: '🇦🇺', code: '+61', label: '+61' },
  { flag: '🇳🇿', code: '+64', label: '+64' },
  { flag: '🇫🇷', code: '+33', label: '+33' },
  { flag: '🇩🇪', code: '+49', label: '+49' },
  { flag: '🇯🇵', code: '+81', label: '+81' },
  { flag: '🇨🇳', code: '+86', label: '+86' },
  { flag: '🇮🇳', code: '+91', label: '+91' },
  { flag: '🇧🇷', code: '+55', label: '+55' },
];

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './phone-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    },
  ],
})
export class PhoneInputComponent extends BaseControl<PhoneValue> {
  id = input('phone');
  name = input('phone');
  hasError = input<boolean | null>(false);

  readonly prefixes = PHONE_PREFIXES;

  prefix = '+1';
  number = '';

  defaultValue(): PhoneValue {
    return { prefix: '+1', number: '' };
  }

  override writeValue(val: PhoneValue | null): void {
    this.prefix = val?.prefix ?? '+1';
    this.number = val?.number ?? '';
    this.cdr.markForCheck();
  }

  emit(): void {
    this.value = { prefix: this.prefix, number: this.number };
    this.onChange(this.value);
  }
}
