import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import AuthStore from '@/app/cores/stores/auth-store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const accessToken = authStore.accessToken();

  if (req.url.includes('/auth/')) {
    return next(req);
  }

  if (accessToken) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
    return next(clonedReq);
  }

  return next(req);
};
