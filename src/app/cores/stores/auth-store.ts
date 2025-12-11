import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { LocalStorageService } from '@/app/cores/services/local-storage-service/local-storage-service';
import { TokenInfoResponse } from '@/app/types/apis/responses/token-info-response';
import { LoginResponse } from '@/app/types/apis/responses/login-response';
import { JwtdecodeService } from '@/app/cores/services/jwtdecode-service/jwtdecode-service';
import STORAGE_KEYS from '@/app/constants/storage-key-config';

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
        localStorageService.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        localStorageService.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        const tokenInfo = jwtdecodeService.parseToken<TokenInfoResponse>(accessToken);
        patchState(store, { accessToken, refreshToken, tokenInfo, isAuthenticated: true });
      },
      removeAuth: () => {
        localStorageService.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorageService.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        patchState(store, {
          accessToken: null,
          refreshToken: null,
          tokenInfo: null,
          isAuthenticated: false,
        });
      },
      loadTokenInfo: () => {
        let tokenInfo: TokenInfoResponse | null = null;
        const accessToken = localStorageService.getItem<LoginResponse['accessToken']>(
          STORAGE_KEYS.ACCESS_TOKEN,
        );
        const refreshToken = localStorageService.getItem<LoginResponse['refreshToken']>(
          STORAGE_KEYS.REFRESH_TOKEN,
        );

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
