import {inject, Injectable} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AppError} from '../models/http-error.model';

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = environment.apiBaseUrl;

  private http: HttpClient = inject(HttpClient);

  get<T>(endpoint: string, params?: Record<string, any>, options?: RequestOptions): Observable<T> {
    return this.http
      .get<T>(this.buildUrl(endpoint), this.buildOptions({ ...options, params: { ...options?.params, ...params } }))
      .pipe(catchError((err) => this.handleError(err)));
  }

  post<T>(endpoint: string, body?: any, params?: Record<string, any>, options?: RequestOptions): Observable<T> {
    return this.http
      .post<T>(this.buildUrl(endpoint), body ?? null, this.buildOptions({ ...options, params: { ...options?.params, ...params } }))
      .pipe(catchError((err) => this.handleError(err)));
  }

  put<T>(endpoint: string, body?: any, params?: Record<string, any>, options?: RequestOptions): Observable<T> {
    return this.http
      .put<T>(this.buildUrl(endpoint), body ?? null, this.buildOptions({ ...options, params: { ...options?.params, ...params } }))
      .pipe(catchError((err) => this.handleError(err)));
  }

  patch<T>(endpoint: string, body?: any, params?: Record<string, any>, options?: RequestOptions): Observable<T> {
    return this.http
      .patch<T>(this.buildUrl(endpoint), body ?? null, this.buildOptions({ ...options, params: { ...options?.params, ...params } }))
      .pipe(catchError((err) => this.handleError(err)));
  }

  delete<T>(endpoint: string, params?: Record<string, any>, options?: RequestOptions): Observable<T> {
    return this.http
      .delete<T>(this.buildUrl(endpoint), this.buildOptions({ ...options, params: { ...options?.params, ...params } }))
      .pipe(catchError((err) => this.handleError(err)));
  }

  // --- Helpers ---

  private buildUrl(endpoint: string): string {
    if (endpoint.startsWith('http')) return endpoint;
    return `${this.baseUrl}/${endpoint.replace(/^\//, '')}`;
  }

  private buildOptions(options?: RequestOptions): object {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams();

    headers = headers.set("X-ManaChat-Client", "manaweb");
    headers = headers.set("X-Client-Version", "1.0.0");

    if (options?.headers) {
      Object.entries(options.headers).forEach(([key, val]) => {
        headers = headers.set(key, val);
      });
    }

    if (options?.params) {
      Object.entries(options.params).forEach(([key, val]) => {
        if (val === null || val === undefined) return;
        if (Array.isArray(val)) {
          val.forEach((v) => (params = params.append(key, String(v))));
        } else {
          params = params.set(key, String(val));
        }
      });
    }

    return {
      headers,
      params,
      responseType: options?.responseType ?? 'json',
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const message = this.extractMessage(error);
    const appError: AppError = {
      status: error.status,
      message: message,
      raw: error.error
    };

    console.error('HttpService Error:', appError);
    return throwError(() => appError);
  }

  private extractMessage(error: HttpErrorResponse): string {
    const body = error.error;

    if (error.error instanceof ErrorEvent) return error.error.message;

    if (typeof body === 'string' && body.trim()) return body;

    if (typeof body === 'object' && body !== null) {
      if (body.message) return body.message;
      if (body.error) return body.error;
      if (body.errors) {
        const first = (Object.values(body.errors).flat() as string[])[0];
        if (first) return first;
      }
      if (body.title) return body.title;
    }

    return this.statusMessage(error.status);
  }

  private statusMessage(status: number): string {
    switch (status) {
      case 400: return 'Invalid request.';
      case 401: return 'You are not authorised.';
      case 403: return 'You do not have permission to do that.';
      case 404: return 'The requested resource was not found.';
      case 500: return 'A server error occurred. Please try again later.';
      default:  return `An unexpected error occurred (${status}).`;
    }
  }
}
