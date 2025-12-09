import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

const STORAGE_TOKEN = new InjectionToken<Storage | null>('local storage token', {
  factory: () => {
    const document = inject(DOCUMENT, {
      optional: true,
    });
    if (document?.defaultView) {
      return document?.defaultView?.localStorage;
    }
    return null;
  },
});

export default STORAGE_TOKEN;
