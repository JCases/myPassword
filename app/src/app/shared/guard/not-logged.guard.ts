import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotLogged implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  canActivate() {
    return this.authService.isLogged().pipe(
      map((val) => !val),
      tap((val) => val || this.router.navigate([this.router.url]))
    );
  }
}
