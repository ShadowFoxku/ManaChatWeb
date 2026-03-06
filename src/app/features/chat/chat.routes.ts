import { Routes } from '@angular/router';

export const CHAT_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chat',
        loadComponent: () =>
          import('./chat.component').then((m) => m.ChatComponent),
      },
      {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full',
      },
    ],
  },
];
