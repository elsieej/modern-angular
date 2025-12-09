import { Routes } from '@angular/router';
import { authGuard } from './cores/guards/auth-guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/protected-page/layouts/protected-layout/protected-layout').then(
        (m) => m.ProtectedLayout,
      ),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/protected-page/dashboard/dashboard').then((m) => m.Dashboard),
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth-page/layouts/auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/auth-page/login/login').then((m) => m.Login),
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];
