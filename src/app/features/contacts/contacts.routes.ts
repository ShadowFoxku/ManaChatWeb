import { Routes } from '@angular/router';

export const CONTACTS_ROUTES: Routes = [
  {
    path: 'contacts',
    children: [
      {
        path: 'chat',
        loadComponent: () =>
          import('../chat/chat.component').then((m) => m.ChatComponent),
      },
      {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full',
      },
    ],
  },
];
