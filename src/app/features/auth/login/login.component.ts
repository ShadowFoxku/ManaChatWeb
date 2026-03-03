import {Component, signal} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {FormFieldComponent} from '../../../shared/components/form-field/form-field.component';
import {TextInputComponent} from '../../../shared/components/text-input/text-input.component';
import {PasswordInputComponent} from '../../../shared/components/password-input/password-input.component';
import {ButtonComponent} from '../../../shared/components/button/button.component';

interface LoginModel {
  usernameOrEmail: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    FormFieldComponent,
    TextInputComponent,
    PasswordInputComponent,
    ButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: '../auth.forms.style.scss',
})
export class LoginComponent {
  model: LoginModel = {
    usernameOrEmail: '',
    password: '',
  };

  isLoading = signal(false);

  onSubmit(form: NgForm): void {
    if (form.invalid) return;
    this.isLoading.set(true);
    // TODO: wire to AuthService
    console.log('Login submitted:', this.model);
  }
}
