import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManaToastService {
  toasts = signal<Toast[]>([]);

  show (message: string, title: string, type: 'success' | 'error' | 'warning' | 'info', duration = 5000): number {
    const id = Date.now();
    this.toasts.update(t => [...t, {id, message, title, type}]);
    setTimeout(() => this.dismiss(id), duration);
    return id;
  }

  success(message: string, title: string, duration = 5000){
    this.show(message, title, 'success', duration);
  }

  error(message: string, title: string, duration = 5000){
    this.show(message, title, 'error', duration);
  }

  warning(message: string, title: string, duration = 5000){
    this.show(message, title, 'warning', duration);
  }

  info(message: string, title: string, duration = 3000){
    this.show(message, title, 'info', duration);
  }

  dismiss(id: number) {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}

export interface Toast {
  id: number;
  message: string;
  title: string;
  type: 'success' | 'warning' | 'error' | 'info';
}
