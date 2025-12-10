import API_CONFIG from '@/app/constants/api-config';
import SEND_TOKEN_IN_AUTH_REQUEST from '@/app/cores/tokens/http-context-token';
import { LoginDto, RefreshTokenDto } from '@/app/types/apis/dtos/login-dto';
import { ApiResponse } from '@/app/types/apis/responses/api-response';
import { LoginResponse } from '@/app/types/apis/responses/login-response';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = `${API_CONFIG.baseUrl}/auth`;

  public isRefreshing = false;

  private refreshTokenSubject = new BehaviorSubject<string | null>(null);
  public refreshToken$ = this.refreshTokenSubject.asObservable();

  public resetRefreshTokenSubject() {
    this.refreshTokenSubject.next(null);
  }

  public addTokenToRefreshTokenSubject(token: string | null) {
    this.refreshTokenSubject.next(token);
  }

  public login(dto: LoginDto) {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/login`, dto);
  }

  public refreshToken(dto: RefreshTokenDto) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${dto.refreshToken}`,
    });
    return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/refresh`, dto, {
      context: new HttpContext().set(SEND_TOKEN_IN_AUTH_REQUEST, true),
      headers,
    });
  }

  public logout() {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }
}
