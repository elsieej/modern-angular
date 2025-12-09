import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, NgOptimizedImage],
  template: `
    <div class="h-screen w-screen">
      <img
        ngSrc="/images/background.png"
        alt="background"
        fill
        priority
        class="object-cover -z-10"
      />
      <router-outlet />
    </div>
  `,
})
export class AuthLayout {}
