import {Component, input, Input} from '@angular/core';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [],
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent {
  label = input('');
  forId = input('');
  error = input('');
  hint = input('');
}
