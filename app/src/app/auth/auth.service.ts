import { Injectable, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IUser } from '../../../../global';
import { Router } from '@angular/router';

interface IToken {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logged = false;
  logged$: EventEmitter<boolean> = new EventEmitter<boolean>();
  SERVER_URL = '/user';

  constructor(private httpClient: HttpClient, private router: Router) {}

  private setLogged(logged: boolean, token = ''): boolean {
    this.logged = logged;

    if (logged && token) {
      localStorage.setItem(environment.token_name, token);
    } else if (!logged) {
      localStorage.removeItem(environment.token_name);
    }
    this.logged$.emit(logged);
    return logged;
  }

  public login(credentials: { user: IUser }) {
    return this.httpClient
      .post<IToken>(`${this.SERVER_URL}/login`, credentials)
      .pipe(map((response) => this.setLogged(true, response.token)))
      .toPromise();
  }

  public isLogged() {
    if (localStorage.getItem(environment.token_name)) {
      return this.httpClient
        .get<boolean>(`${this.SERVER_URL}/token`)
        .pipe(tap((logged) => this.setLogged(logged)));
    }
    return of(false);
  }

  public logout() {
    localStorage.clear();
    this.setLogged(false);
    this.router.navigate(['/auth']);
  }

  public getAuthorizationToken() {
    return `Bearer ${localStorage.getItem(environment.token_name)}`;
  }

  public async rehydrate() {
    return this.httpClient
      .get<IToken>(`${this.SERVER_URL}/rehydrate`)
      .pipe(tap((res) => this.setLogged(true, res.token)))
      .toPromise();
  }
}
