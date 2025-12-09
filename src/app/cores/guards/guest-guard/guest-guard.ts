import AuthStore from '@/app/cores/stores/auth-store';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const isAuthenticated = authStore.isAuthenticated();
  if (isAuthenticated) {
    return router.createUrlTree(['/']);
  }
  return true;
};
