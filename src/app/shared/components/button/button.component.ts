import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import { NgClass } from '@angular/common';
import {ManaLoaderComponent} from '../mana-loader/mana-loader.component';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonType    = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass, ManaLoaderComponent],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  type = input<ButtonType>('button');
  loading = input<boolean>(false);
  disabled = input<boolean | null>(false);
  fullWidth = input<boolean>(false);
  clicked = output<MouseEvent>();

  get isDisabled(): boolean {
    return (this.disabled() ?? false) || this.loading();
  }

  onClick(event: MouseEvent): void {
    if (this.disabled()) return;
    this.clicked.emit(event);
  }
}
