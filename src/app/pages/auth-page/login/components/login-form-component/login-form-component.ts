import AuthStore from '@/app/cores/stores/auth-store';
import LoginStore from '@/app/pages/auth-page/login/stores/login-store';
import { LoginDto } from '@/app/types/apis/dtos/login-dto';
import { FormModel } from '@/app/types/form-type';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login-form-component',
  imports: [
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
    MessageModule,
  ],
  providers: [LoginStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
      <div class="flex flex-col gap-1">
        <p-floatlabel variant="on">
          <input
            type="text"
            pInputText
            formControlName="username"
            autocomplete="off"
            [autofocus]="true"
            [fluid]="true"
            [invalid]="loginForm.get('username')?.invalid && loginForm.get('username')?.touched"
            inputId="username"
          />
          <label for="username">Tên đăng nhập</label>
        </p-floatlabel>
        @if (loginForm.get('username')?.invalid && loginForm.get('username')?.touched) {
          <p-message severity="error" size="small" variant="simple">
            @if (loginForm.get('username')?.hasError('required')) {
              Tên đăng nhập là bắt buộc.
            }
          </p-message>
        }
      </div>
      <div class="flex flex-col gap-1">
        <p-floatlabel variant="on">
          <p-password
            class="w-full"
            formControlName="password"
            autocomplete="off"
            [fluid]="true"
            [toggleMask]="true"
            [feedback]="false"
            [invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
            inputId="password"
          />
          <label for="password">Mật khẩu</label>
        </p-floatlabel>
        @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
          <p-message severity="error" size="small" variant="simple">
            @if (loginForm.get('password')?.hasError('required')) {
              Mật khẩu là bắt buộc.
            }
          </p-message>
        }
      </div>
      <p-button
        type="submit"
        [loading]="loginStore.loading() === 'loading'"
        [disabled]="loginForm.invalid"
        [fluid]="true"
        label="Đăng nhập"
      />
    </form>
  `,
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);

  public authStore = inject(AuthStore);
  public loginStore = inject(LoginStore);

  public loginForm: FormGroup<FormModel<LoginDto>> = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  public onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const valueForm = this.loginForm.getRawValue();
    this.loginStore.login({ dto: valueForm });
  }
}
