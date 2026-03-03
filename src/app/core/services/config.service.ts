import {inject, Injectable} from '@angular/core';
import {Observable, of, tap} from 'rxjs';
import {Config} from '../models/config.model';
import {HttpService} from './http.service';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private httpService = inject(HttpService);

  private config: Config | null = null;

  getConfig(): Observable<Config> {
    if (this.config !== null) {
      return of(this.config);
    }

    return this.httpService.get<Config>('site/config').pipe(
      tap((config) => (this.config = config))
    );
  }
}
