import { AuthService } from '@/app/cores/services/auth-service/auth-service';
import AuthStore from '@/app/cores/stores/auth-store';
import { LoginDto } from '@/app/types/apis/dtos/login-dto';
import { LoadingStatus } from '@/app/types/apis/responses/api-response';
import { LoginResponse } from '@/app/types/apis/responses/login-response';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

type LoginState = {
  data: LoginResponse | null;
  loading: LoadingStatus;
  error: string | null;
};

const initialState: LoginState = {
  data: null,
  loading: 'idle',
  error: null,
};

const LoginStore = signalStore(
  withState(initialState),
  withMethods((store, authService = inject(AuthService), authStore = inject(AuthStore)) => ({
    login: rxMethod<{ dto: LoginDto }>(
      pipe(
        tap(() => patchState(store, { loading: 'loading' })),
        switchMap(({ dto }) => authService.login(dto)),
        tapResponse({
          next: (response) => {
            patchState(store, { data: response.data, loading: 'success' });
            authStore.setAuth(response.data.accessToken, response.data.refreshToken);
          },
          error: (error: HttpErrorResponse) =>
            patchState(store, { error: error.message, loading: 'error' }),
        }),
      ),
    ),
  })),
);

export default LoginStore;
