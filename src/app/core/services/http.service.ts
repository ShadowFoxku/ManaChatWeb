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
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, body?: any, params?: Record<string, any>, options?: RequestOptions): Observable<T> {
    return this.http
      .post<T>(this.buildUrl(endpoint), body ?? null, this.buildOptions({ ...options, params: { ...options?.params, ...params } }))
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body?: any, params?: Record<string, any>, options?: RequestOptions): Observable<T> {
    return this.http
      .put<T>(this.buildUrl(endpoint), body ?? null, this.buildOptions({ ...options, params: { ...options?.params, ...params } }))
      .pipe(catchError(this.handleError));
  }

  patch<T>(endpoint: string, body?: any, params?: Record<string, any>, options?: RequestOptions): Observable<T> {
    return this.http
      .patch<T>(this.buildUrl(endpoint), body ?? null, this.buildOptions({ ...options, params: { ...options?.params, ...params } }))
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string, params?: Record<string, any>, options?: RequestOptions): Observable<T> {
    return this.http
      .delete<T>(this.buildUrl(endpoint), this.buildOptions({ ...options, params: { ...options?.params, ...params } }))
      .pipe(catchError(this.handleError));
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
    let message = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else {
      message = `[${error.status}]: ${JSON.stringify(error.error)}`;
    }
    console.error('HttpService Error:', message);
    return throwError(() => new Error(message));
  }
}
