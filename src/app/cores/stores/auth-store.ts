import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { LocalStorageService } from '../services/local-storage-service/local-storage-service';
import { TokenInfoResponse } from '@/app/types/apis/responses/token-info-response';
import { LoginResponse } from '@/app/types/apis/responses/login-response';
import { JwtdecodeService } from '../services/jwtdecode-service/jwtdecode-service';

type AuthState = {
  isAuthenticated: boolean;
  accessToken: LoginResponse['accessToken'] | null;
  refreshToken: LoginResponse['refreshToken'] | null;
  tokenInfo: TokenInfoResponse | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  tokenInfo: null,
};

const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      localStorageService = inject(LocalStorageService),
      jwtdecodeService = inject(JwtdecodeService),
    ) => ({
      setAuth: (accessToken: string, refreshToken: string) => {
        localStorageService.setItem('accessToken', accessToken);
        localStorageService.setItem('refreshToken', refreshToken);
        const tokenInfo = jwtdecodeService.parseToken<TokenInfoResponse>(accessToken);
        patchState(store, { accessToken, refreshToken, tokenInfo, isAuthenticated: true });
      },
      removeAuth: () => {
        localStorageService.removeItem('accessToken');
        localStorageService.removeItem('refreshToken');
        patchState(store, {
          accessToken: null,
          refreshToken: null,
          tokenInfo: null,
          isAuthenticated: false,
        });
      },
      loadTokenInfo: () => {
        let tokenInfo: TokenInfoResponse | null = null;
        const accessToken =
          localStorageService.getItem<LoginResponse['accessToken']>('accessToken');
        const refreshToken =
          localStorageService.getItem<LoginResponse['refreshToken']>('refreshToken');

        if (accessToken) {
          tokenInfo = jwtdecodeService.parseToken<TokenInfoResponse>(accessToken);
        }
        patchState(store, { accessToken, refreshToken, tokenInfo, isAuthenticated: !!tokenInfo });
      },
    }),
  ),
  withHooks({
    onInit: (store) => {
      store.loadTokenInfo();
    },
  }),
);

export default AuthStore;
