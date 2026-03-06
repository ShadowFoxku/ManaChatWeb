import { Component, input, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SlicePipe, UpperCasePipe } from '@angular/common';
import { PanelView } from '../layout.component';
import { ConversationsService } from '../../services/conversations/conversations.service';

@Component({
  selector: 'app-inner-rail',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SlicePipe, UpperCasePipe],
  templateUrl: './inner-rail.component.html',
  styleUrl: './inner-rail.component.css',
})
export class InnerRailComponent {
  view             = input.required<PanelView>();
  activeInstanceId = input<number | null>(null);

  panelCollapsed = signal(false);

  private conversationsService = inject(ConversationsService);

  conversations = this.conversationsService.conversations;

  togglePanel(): void {
    this.panelCollapsed.update(v => !v);
  }

  presenceColor(presence?: string): string {
    switch (presence) {
      case 'online':  return 'var(--color-presence-online)';
      case 'idle':    return 'var(--color-presence-idle)';
      case 'dnd':     return 'var(--color-presence-dnd)';
      default:        return 'var(--color-presence-offline)';
    }
  }
}
