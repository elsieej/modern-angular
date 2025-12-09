import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class JwtdecodeService {
  public parseToken<T>(token: string) {
    try {
      return jwtDecode<T>(token);
    } catch {
      return null;
    }
  }
}
