import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-found',
  imports: [ButtonModule, RouterModule],
  template: `
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-2xl font-bold">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <div class="flex items-center justify-center gap-2 mt-4">
        <p-button label="Go Back" [outlined]="true" severity="secondary" (onClick)="goBack()">
        </p-button>
        <p-button label="Go Home" routerLink="/"> </p-button>
      </div>
    </div>
  `,
  styles: ``,
})
export class NotFound {
  private location = inject(Location);

  public goBack() {
    this.location.back();
  }
}
