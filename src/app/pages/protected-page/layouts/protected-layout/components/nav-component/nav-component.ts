import { APP_MENU_CONFIG, USER_MENU_CONFIG } from '@/app/constants/app-menu-config';
import { APP_VERSION } from '@/app/constants/version-config';
import { ThemeService } from '@/app/cores/services/theme-service/theme-service';
import AuthStore from '@/app/cores/stores/auth-store';
import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';

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
    TooltipModule,
    ToggleSwitchModule,
    FormsModule,
  ],
  template: `
    <nav>
      <p-menubar [model]="items" styleClass="shadow-sm backdrop-blur-md px-4 py-2">
        <ng-template pTemplate="start">
          <a routerLink="/" class="flex items-center gap-2 mr-4 no-underline">
            <div class="relative size-8">
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
            <div class="flex gap-x-4 items-center">
              <div class="flex items-center gap-x-2">
                <span
                  class="text-(--p-button-text-warn-color) dark:text-current dark:opacity-30 transition-colors"
                >
                  <!-- sun icon -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path
                      d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"
                    ></path>
                  </svg>
                </span>
                <p-toggleSwitch
                  [ngModel]="themeService.isDarkMode()"
                  (ngModelChange)="toggleDarkMode()"
                />
                <span class="opacity-30 dark:opacity-100 transition-colors">
                  <!-- moon icon -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path
                      d="M11.3807 2.01886C9.91573 3.38768 9 5.3369 9 7.49999C9 11.6421 12.3579 15 16.5 15C18.6631 15 20.6123 14.0843 21.9811 12.6193C21.6613 17.8537 17.3149 22 12 22C6.47715 22 2 17.5228 2 12C2 6.68514 6.14629 2.33869 11.3807 2.01886Z"
                    ></path>
                  </svg>
                </span>
              </div>

              <span [pTooltip]="appVersion" tooltipPosition="bottom">
                <span class="text-(--p-button-text-info-color)">
                  <!-- information icon -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path
                      d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"
                    ></path>
                  </svg>
                </span>
              </span>

              <p-button (click)="userPopover.toggle($event)" [text]="true" [rounded]="true">
                <p-avatar [label]="authStore.tokenInfo()?.name?.charAt(0) || 'A'" shape="circle">
                </p-avatar>

                <span class="font-semibold text-sm">
                  {{ authStore.tokenInfo()?.name }}
                </span>
              </p-button>
            </div>

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
  public themeService = inject(ThemeService);

  public appVersion = APP_VERSION;

  public toggleDarkMode() {
    this.themeService.toggleTheme();
  }
}
