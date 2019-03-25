import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(public autService: AuthService) { }

  canActivate() {
    return this.autService.isAuth();
  }

  canLoad() {
    return this.autService.isAuth().pipe(
      take(1)
    );
  }
}
