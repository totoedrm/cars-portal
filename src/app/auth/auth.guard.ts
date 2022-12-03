import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
  ) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user_storage = localStorage.getItem(Constants.USER_STORAGE);
    if (user_storage != null) {
      //let jsonObj: SocialUser = JSON.parse(user_storage);
      return true;
    }
    this.router.navigateByUrl(Constants.ROUTE_LOGIN);
    return false;
  }

}
