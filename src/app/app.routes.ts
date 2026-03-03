import { Routes } from '@angular/router';

export const routes: Routes = [
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
