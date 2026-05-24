/**
 * Serviço de Notificações (Toasts)
 */

import { Toast } from '@types/index';

type ToastCallback = (toast: Toast) => void;

class NotificationService {
  private toasts: Map<string, Toast> = new Map();
  private callbacks: ToastCallback[] = [];
  private toastId = 0;

  private generateId(): string {
    return `toast-${++this.toastId}`;
  }

  private notify(toast: Toast): void {
    this.toasts.set(toast.id, toast);
    this.callbacks.forEach((cb) => cb(toast));

    if (toast.duration && toast.duration > 0) {
      setTimeout(() => this.dismiss(toast.id), toast.duration);
    }
  }

  success(message: string, duration = 3000): string {
    const toast: Toast = {
      id: this.generateId(),
      message,
      type: 'success',
      duration,
    };
    this.notify(toast);
    return toast.id;
  }

  error(message: string, duration = 5000): string {
    const toast: Toast = {
      id: this.generateId(),
      message,
      type: 'error',
      duration,
    };
    this.notify(toast);
    return toast.id;
  }

  warning(message: string, duration = 4000): string {
    const toast: Toast = {
      id: this.generateId(),
      message,
      type: 'warning',
      duration,
    };
    this.notify(toast);
    return toast.id;
  }

  info(message: string, duration = 3000): string {
    const toast: Toast = {
      id: this.generateId(),
      message,
      type: 'info',
      duration,
    };
    this.notify(toast);
    return toast.id;
  }

  dismiss(id: string): void {
    this.toasts.delete(id);
    this.callbacks.forEach((cb) => {
      const toast = this.toasts.get(id);
      if (!toast) cb({ id, message: '', type: 'info' });
    });
  }

  subscribe(callback: ToastCallback): () => void {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    };
  }

  getAll(): Toast[] {
    return Array.from(this.toasts.values());
  }

  clear(): void {
    this.toasts.clear();
  }
}

export const notificationService = new NotificationService();
