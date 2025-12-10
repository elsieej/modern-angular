import { AuthService } from '@/app/cores/services/apis/auth-service/auth-service';
import AuthStore from '@/app/cores/stores/auth-store';
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, filter, finalize, switchMap, take, tap, throwError } from 'rxjs';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authStore = inject(AuthStore);

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          return handleUnauthorizedError(req, next, error, authService, authStore);
        }
      }
      return throwError(() => error);
    }),
  );
};

const handleUnauthorizedError = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  error: HttpErrorResponse,
  authService: AuthService,
  authStore: InstanceType<typeof AuthStore>,
) => {
  if (req.url.includes('/auth/refresh')) {
    authStore.removeAuth();
    return throwError(() => error);
  }

  if (!authService.isRefreshing) {
    /* Locking the refresh token process */
    authService.isRefreshing = true;
    authService.resetRefreshTokenSubject();

    const refreshToken = authStore.refreshToken();

    if (!refreshToken) {
      authStore.removeAuth();
      return throwError(() => error);
    }

    return authService.refreshToken({ refreshToken }).pipe(
      tap({
        next: (response) => {
          const { accessToken, refreshToken } = response.data;
          authStore.setAuth(accessToken, refreshToken);
          authService.addTokenToRefreshTokenSubject(refreshToken);
        },
      }),
      switchMap((res) => next(addTokenToRequest(req, res.data.accessToken))),
      catchError((err) => {
        authService.addTokenToRefreshTokenSubject(null);
        authStore.removeAuth();
        return throwError(() => err);
      }),
      finalize(() => {
        authService.isRefreshing = false;
      }),
    );
  } else {
    return authService.refreshToken$.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next(addTokenToRequest(req, token))),
    );
  }
};

const addTokenToRequest = (req: HttpRequest<unknown>, token: string) => {
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
};
