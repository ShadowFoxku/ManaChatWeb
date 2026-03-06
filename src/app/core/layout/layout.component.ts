import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OuterRailComponent } from './outer-rail/outer-rail.component';
import { InnerRailComponent } from './inner-rail/inner-rail.component';

export type PanelView = 'channels' | 'messages';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, OuterRailComponent, InnerRailComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  railCollapsed   = signal(false);
  mobileOpen      = signal(false);
  activePanelView = signal<PanelView>('messages');
  activeInstanceId  = signal<number | null>(null);

  toggleRail()   { this.railCollapsed.update(v => !v); }
  toggleMobile() { this.mobileOpen.update(v => !v); }
}
