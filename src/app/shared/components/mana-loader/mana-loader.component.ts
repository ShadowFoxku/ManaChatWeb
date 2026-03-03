import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mana-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mana-loader.component.html',
  styleUrls: ['./mana-loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManaLoaderComponent {
  label = input('Loading...');
  size = input(120);

  color = input<string | null>(null);
  shimmerColor = input<string | null>(null);

  hostStyles = computed(() => ({
    '--loader-size': `${this.size()}px`,
    ...(this.color()        ? { '--color-primary':          this.color()!        } : {}),
    ...(this.shimmerColor() ? { '--color-text-on-primary':  this.shimmerColor()! } : {}),
  }));
}
