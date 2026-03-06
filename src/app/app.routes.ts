import { Routes } from '@angular/router';
import {LayoutComponent} from './core/layout/layout.component';
import {authGuard} from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./features/chat/chat.routes').then((m) => m.CHAT_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  // TODO: Make a 404 page? Default fallback?
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
