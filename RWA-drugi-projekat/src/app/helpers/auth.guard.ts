import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.userValue;
    if (user) {
      if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/account/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
