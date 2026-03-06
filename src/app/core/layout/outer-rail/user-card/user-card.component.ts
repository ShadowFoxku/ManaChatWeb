import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {lucideUserCog} from '@ng-icons/lucide';

export type PresenceStatus = 'online' | 'idle' | 'dnd' | 'offline';

export interface PresenceOption {
  value: PresenceStatus;
  label: string;
  color: string;
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink, NgIcon],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
  providers: [
    provideIcons({ lucideUserCog }),
  ]
})
export class UserCardComponent {
  presence   = signal<PresenceStatus>('online');
  statusText = signal('');

  readonly presenceOptions: PresenceOption[] = [
    { value: 'online',  label: 'Online',          color: 'var(--color-presence-online)'  },
    { value: 'idle',    label: 'Idle',             color: 'var(--color-presence-idle)'    },
    { value: 'dnd',     label: 'Do Not Disturb',   color: 'var(--color-presence-dnd)'     },
    { value: 'offline', label: 'Appear Offline',   color: 'var(--color-presence-offline)' },
  ];

  activePresence(): PresenceOption {
    return this.presenceOptions.find(p => p.value === this.presence())!;
  }
}
