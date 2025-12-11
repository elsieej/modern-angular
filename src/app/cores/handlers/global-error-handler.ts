import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
    private zone: NgZone,
  ) {}

  handleError(error: any): void {
    const messageService = this.injector.get(MessageService);

    console.error('🔥 Global Error Caught:', error);

    this.zone.run(() => {
      messageService.add({
        severity: 'error',
        summary: 'Lỗi ứng dụng',
        detail: 'Đã xảy ra lỗi xử lý. Vui lòng tải lại trang.',
        sticky: true,
      });
    });
  }
}
