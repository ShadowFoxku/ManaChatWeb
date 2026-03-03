import { Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { PhoneInputComponent } from '../../../shared/components/phone-input/phone-input.component';
// import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

import {ConfigService} from '../../../core/services/config.service';
import {Config} from '../../../core/models/config.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ManaLoaderComponent} from '../../../shared/components/mana-loader/mana-loader.component';
import {AuthService} from '../../../core/services/auth.service';
import {finalize} from 'rxjs';
import {PageLoader} from '../../../shared/components/page-loader/page-loader';
import {ManaToastService} from '../../../core/services/mana-toast.service';
import {AppError} from '../../../core/models/http-error.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormFieldComponent,
    TextInputComponent,
    PasswordInputComponent,
    PhoneInputComponent,
    // CheckboxComponent,
    ButtonComponent,
    ManaLoaderComponent,
    PageLoader
  ],
  templateUrl: './register.component.html',
  styleUrl: '../auth.forms.style.scss',
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private configService = inject(ConfigService);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ManaToastService);

  config = signal<Config | null>(null);
  configError = signal(false);

  form = signal<FormGroup | null>(null);
  isSubmitting = signal(false);

  showPhoneNumber() {
    return this.config()?.Users?.AccountOptions?.AcceptPhoneNumber ?? false;
  }

  getPhoneNumberFields() {
    const needed = this.config()?.Users?.AccountOptions?.RequirePhoneNumber ?? false;
    if (!needed) {
      return {
        prefix: ['+1'],
        number: [''],
      };
    }
    return {
      prefix: ['+1', Validators.required],
      number: ['', Validators.required],
    };
  }

  showEmail() {
    return this.config()?.Users?.AccountOptions?.AcceptEmail ?? false;
  }

  getEmailValidators() {
    const neeeded = this.config()?.Users?.AccountOptions?.RequireEmail ?? false;
    if (!neeeded) {
      return [Validators.email];
    }
    return [Validators.required, Validators.email];
  }

  ngOnInit(): void {
    this.configService.getConfig()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: (cfg) => {
        this.config.set(cfg);
        this.buildForm();
      },
      error: () => {
        this.configError.set(true);
        this.toast.error("There was an error loading config from the server. Please try again later.", "Registration not available.", 45000);
      },
    });
  }

  private buildForm(): void {
    this.form.set(this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(256),
          Validators.pattern(/^[a-zA-Z0-9_\-]+$/),
        ],
      ],
      ...(this.showEmail() && {
        email: ['', this.getEmailValidators()],
      }),
      ...(this.showPhoneNumber() && {
        phone: this.fb.group(this.getPhoneNumberFields()),
      }),
      password: ['', [Validators.required, Validators.minLength(8)]],
      // acceptTerms: [false, Validators.requiredTrue],
    }));
  }

  get username() { return this.form()?.get('username')!; }
  get email()    { return this.form()?.get('email'); }
  get phone()    { return this.form()?.get('phone'); }
  get password() { return this.form()?.get('password')!; }

  onSubmit(): void {
    if (!this.form())
      return;

    if (this.form()!.invalid) {
      this.form()!.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);

    this.authService.register(this.username.value, this.password?.value, this.email?.value, this.phone?.value)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.toast.success("Registered successfully! Please log in to continue.", "Success!", 7500);
          this.router.navigate(["auth/login"]);
        },
        error: (err: AppError) => {
          this.toast.error(err.message, "Registration failed.")
        }
      });
  }
}
