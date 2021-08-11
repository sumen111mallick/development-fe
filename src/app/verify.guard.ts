import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './_services/user.service';
import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyGuard implements CanActivate {

  phone_number_verify_status;
  public val;
  public user_value: any;

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;

    return this.checkLogin(url);
    //return true;
  }
  checkLogin(url: string): true | UrlTree {
    console.log("Url: " + url);

    //let val: string = this.tokenStorage.getUser().usertype;
    let val = this.tokenStorage.getUser();
    console.log(val);
    console.log(this.tokenStorage);
    if (val != null) {
      console.log("True");
      return true;
    } else {
      console.log("false");
      return this.router.parseUrl('/login');
    }
  }

}
