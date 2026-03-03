import {inject, Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpService = inject(HttpService);

  public register(username: string, password: string, email: string, phoneNumber: string): Observable<any> {
    let body = { username, password, email, phoneNumber };
    return this.httpService.post('users/register', body)
  }
}
