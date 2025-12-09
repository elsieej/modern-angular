import { Routes } from '@angular/router';
import { authGuard } from './cores/guards/auth-guard/auth-guard';
import { guestGuard } from './cores/guards/guest-guard/guest-guard';

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
    canActivate: [guestGuard],
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
