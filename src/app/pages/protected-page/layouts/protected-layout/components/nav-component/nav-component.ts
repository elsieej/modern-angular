import { APP_MENU_CONFIG, USER_MENU_CONFIG } from '@/app/constants/app-menu-config';
import AuthStore from '@/app/cores/stores/auth-store';
import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-nav-component',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MenubarModule,
    RouterModule,
    ButtonModule,
    AvatarModule,
    PopoverModule,
  ],
  template: `
    <nav>
      <p-menubar [model]="items" styleClass="shadow-sm backdrop-blur-md px-4 py-2">
        <ng-template pTemplate="start">
          <a routerLink="/" class="flex items-center gap-2 mr-4 no-underline text-slate-800">
            <div class="relative w-8 h-8">
              <img ngSrc="/logo/tris-logo.svg" fill alt="Logo" class="object-contain" priority />
            </div>
            <span class="font-bold text-xl tracking-tight">Tris Face</span>
          </a>
        </ng-template>

        <ng-template pTemplate="item" let-item let-root="root">
          <a
            [routerLink]="item.routerLink"
            routerLinkActive="bg-slate-900 text-white shadow-md"
            [routerLinkActiveOptions]="{ exact: item.routerLink === '/' }"
            class="flex items-center p-menuitem-link cursor-pointer px-4 py-2 rounded-md transition-all hover:bg-slate-100 text-slate-600 font-medium"
          >
            @if (item.icon) {
              <span [class]="item.icon" class="mr-2"></span>
            }
            <span>{{ item.label }}</span>
          </a>
        </ng-template>

        <ng-template pTemplate="end">
          @if (authStore.isAuthenticated()) {
            <p-button (click)="userPopover.toggle($event)" [text]="true" [rounded]="true">
              <p-avatar [label]="authStore.tokenInfo()?.name?.charAt(0) || 'A'" shape="circle">
              </p-avatar>

              <span class="font-semibold text-sm">
                {{ authStore.tokenInfo()?.name }}
              </span>
            </p-button>
            <p-popover #userPopover>
              <div class="space-y-4 min-w-48">
                @for (item of userMenuItems; track item.label) {
                  <a
                    [routerLink]="item.routerLink"
                    class="block px-4 py-2 hover:text-(--p-menubar-item-focus-color)
                  hover:bg-(--p-menubar-item-focus-background) transition-colors"
                    >{{ item.label }}</a
                  >
                }
              </div>
            </p-popover>
          }
        </ng-template>
      </p-menubar>
    </nav>
  `,
})
export class NavComponent {
  public items: MenuItem[] = APP_MENU_CONFIG;
  public userMenuItems: MenuItem[] = USER_MENU_CONFIG;
  public authStore = inject(AuthStore);
}
