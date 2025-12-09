import API_CONFIG from '@/app/constants/api-config';
import { LoginDto } from '@/app/types/apis/dtos/login-dto';
import { ApiResponse } from '@/app/types/apis/responses/api-response';
import { LoginResponse } from '@/app/types/apis/responses/login-response';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  public login(dto: LoginDto) {
    return this.http.post<ApiResponse<LoginResponse>>(`${API_CONFIG.baseUrl}/auth/login`, dto);
  }

  public logout() {
    return this.http.post(`${API_CONFIG.baseUrl}/auth/logout`, {});
  }
}
