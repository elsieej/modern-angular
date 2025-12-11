import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          return throwError(() => error);
        }

        let serverity = 'error';
        let summary = 'An error occurred';
        let detail = 'Please try again later.';

        switch (error.status) {
          case 400:
            serverity = 'warn';
            summary = 'Bad Request';
            detail =
              error.error.message ||
              'The request was invalid. Please check your request and try again.';
            break;
          case 403:
            summary = 'Forbidden';
            detail = error.error.message || 'You are not authorized to access this resource.';
            break;
          case 404:
            summary = 'Not Found';
            detail = error.error.message || 'The requested resource was not found.';
            break;
          case 500:
            summary = 'Internal Server Error';
            detail = 'An unexpected error occurred. Please try again later.';
            break;
          case 0:
            summary = 'Network Error';
            detail =
              'A network error occurred. Please check your internet connection and try again.';
            break;
          default:
            detail = error.error.message || 'An error occurred';
            break;
        }

        messageService.add({
          severity: serverity,
          summary,
          detail,
          life: 5000,
        });
      }
      return throwError(() => error);
    }),
  );
};
