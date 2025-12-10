import AuthStore from '@/app/cores/stores/auth-store';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import SEND_TOKEN_IN_AUTH_REQUEST from '../../tokens/http-context-token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const accessToken = authStore.accessToken();

  const shouldSkip = req.url.includes('/auth/') || req.context.get(SEND_TOKEN_IN_AUTH_REQUEST);

  if (shouldSkip) {
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
