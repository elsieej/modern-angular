import { inject, Injectable } from '@angular/core';
import STORAGE_TOKEN from '@/app/cores/tokens/storage-token';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private ls = inject(STORAGE_TOKEN);

  getItem<TData = string>(key: string): (TData extends object ? TData : string) | null {
    if (!this.ls) {
      return null;
    }
    const item = this.ls.getItem(key);
    if (!item) {
      return null;
    }
    try {
      const parsed = JSON.parse(item);
      if (typeof parsed === 'object') {
        return parsed;
      }
      return parsed as TData extends object ? TData : string;
    } catch (error) {
      return item as TData extends object ? TData : string;
    }
  }

  setItem(key: string, value: unknown) {
    if (!this.ls) {
      return;
    }

    if (typeof value === 'object') {
      this.ls.setItem(key, JSON.stringify(value));
    } else {
      this.ls.setItem(key, value as string);
    }
  }

  removeItem(key: string) {
    if (!this.ls) {
      return;
    }
    this.ls.removeItem(key);
  }
}
