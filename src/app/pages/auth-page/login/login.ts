import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { LoginFormComponent } from './components/login-form-component/login-form-component';
@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    LoginFormComponent
  ],
  template: `
    <div class="flex flex-col justify-center h-full max-w-[568px] mx-auto bg-transparent">
      <p-card class="auth-form p-4">
        <ng-template #header>
          <div class="flex flex-col items-center gap-4 mb-4">
            <img src="/logo/tris-logo.svg" alt="Tris Face Logo" class="w-16 h-16" />
            <h1 class="text-white text-2xl font-bold">Đăng nhập</h1>
          </div>
        </ng-template>
        <app-login-form-component />
      </p-card>
    </div>
  `,
})
export class Login {}
