import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLockKeyhole } from '@ng-icons/lucide';
import { BaseControl } from '../base/base-control';

interface StrengthLevel {
  width: string;
  color: string;
  label: string;
}

const STRENGTH_LEVELS: StrengthLevel[] = [
  { width: '0%',   color: '#e05252', label: 'Enter a password' },
  { width: '15%',  color: '#e05252', label: 'Too short'        },
  { width: '30%',  color: '#f0b232', label: 'Weak'             },
  { width: '50%',  color: '#f0b232', label: 'Moderate'         },
  { width: '75%',  color: '#2db891', label: 'Strong'           },
  { width: '100%', color: '#3dbe7a', label: 'Excellent'        },
];

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './password-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({ lucideLockKeyhole }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent extends BaseControl<string> {
  readonly id           = input('password');
  readonly name         = input('password');
  readonly placeholder  = input('••••••••');
  readonly hasError     = input<boolean | null>(false);
  readonly showStrength = input(false);

  defaultValue(): string {
    return '';
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
    this.cdr.markForCheck();
  }

  get strength(): StrengthLevel {
    if (!this.value) return STRENGTH_LEVELS[0];
    const checks = [
      this.value.length >= 8,
      this.value.length >= 12,
      /[A-Z]/.test(this.value),
      /\d/.test(this.value),
      /[^A-Za-z0-9]/.test(this.value),
    ];
    return STRENGTH_LEVELS[checks.filter(Boolean).length];
  }
}
