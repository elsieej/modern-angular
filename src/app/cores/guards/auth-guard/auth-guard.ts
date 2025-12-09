import AuthStore from '@/app/cores/stores/auth-store';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authStore = inject(AuthStore);
  const isAuthenticated = authStore.isAuthenticated();
  if (isAuthenticated) {
    return true;
  }
  return router.createUrlTree(['/auth/login']);
};
