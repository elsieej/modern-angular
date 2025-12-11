import STORAGE_KEYS from '@/app/constants/storage-key-config';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { LocalStorageService } from '../local-storage-service/local-storage-service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private localStorageService = inject(LocalStorageService);
  private destroyRef = inject(DestroyRef);

  isDarkMode = signal<boolean>(false);

  constructor() {
    this.initTheme();
  }

  public toggleTheme() {
    this.isDarkMode.update((current) => !current);
    this.localStorageService.setItem(STORAGE_KEYS.THEME, this.isDarkMode() ? 'dark' : 'light');
    this.updateClass();
  }

  private initTheme() {
    const localStorageTheme = this.localStorageService.getItem('theme');
    const systemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (localStorageTheme) {
      this.isDarkMode.set(localStorageTheme === 'dark');
    } else {
      this.isDarkMode.set(systemDarkTheme.matches);
    }

    this.updateClass();

    fromEvent<MediaQueryListEvent>(systemDarkTheme, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        const theme = this.localStorageService.getItem('theme');
        if (!theme) {
          this.isDarkMode.set(e.matches);
          this.updateClass();
        }
      });
  }

  private updateClass() {
    const element = document.querySelector('html');
    if (!element) {
      return;
    }
    if (this.isDarkMode()) {
      element.classList.add('modern-angular-dark-mode');
    } else {
      element.classList.remove('modern-angular-dark-mode');
    }
  }
}
