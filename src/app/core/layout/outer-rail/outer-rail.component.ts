import { Component, input, output, signal, HostListener } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { PanelView } from '../layout.component';

@Component({
  selector: 'app-outer-rail',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './outer-rail.component.html',
  styleUrl: './outer-rail.component.css',
})
export class OuterRailComponent {
  railCollapsed   = input.required<boolean>();
  activePanelView = input.required<PanelView>();

  toggleRail      = output<void>();
  panelViewChange = output<PanelView>();

  userCardOpen   = signal(false);

  toggleUserCard(): void {
    this.userCardOpen.update(v => !v);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.user-panel')) {
      this.userCardOpen.set(false);
    }
  }
}
