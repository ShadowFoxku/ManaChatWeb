import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import { NgClass } from '@angular/common';
import {ManaLoaderComponent} from '../mana-loader/mana-loader.component';
import {share} from 'rxjs';

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

  get loaderColor(): string | null {
    switch(this.variant()) {
      case 'primary':
        return '--color-text-on-primary';
      case 'secondary':
        return '--color-text-on-secondary';
      case 'danger':
        return '--color-text-on-danger';
      case 'ghost':
          return '--color-text';
      default:
        return null;
    }
  }

  get loaderShimmerColor(): string | null {
    switch(this.variant()) {
      case 'primary':
        return '--color-text-primary';
      case 'secondary':
        return '--color-text-on-secondary';
      case 'danger':
        return '--color-text-on-danger';
      case 'ghost':
        return '--color-text-muted';
      default:
        return null;
    }
  }

  protected readonly share = share;
}
