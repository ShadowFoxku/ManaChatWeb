import {inject, Injectable, signal} from '@angular/core';
import {HttpService} from '../services/http/http.service';
import {map, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpService = inject(HttpService);
  private _isAuthenticated = signal<boolean | null>(null);

  register(username: string, password: string, email: string, phoneNumber: string): Observable<any> {
    let body = { username, password, email, phoneNumber };
    return this.httpService.post<any>('user', body)
  }

  login(username: string, password: string) {
    let body = { username, password };
    return this.httpService.post<any>('user/login', body)
  }

  checkSession(): Observable<boolean> {
    const cached = this._isAuthenticated();
    if (cached !== null) return of(cached);

    return this.httpService.get('/auth').pipe(
      map(() => {
        this._isAuthenticated.set(true);
        return true;
      }),
      catchError(() => {
        this._isAuthenticated.set(false);
        return of(false);
      })
    );
  }

  invalidateSession(): void {
    this._isAuthenticated.set(null);
  }

  isAuthenticated(): boolean | null {
    return this._isAuthenticated();
  }
}
