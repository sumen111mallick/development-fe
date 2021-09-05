import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './_services/user.service';
import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  phone_number_verify_status;
  public val;
  public user_value: any;
  public userEmail: string[] = null;
  private usertype: any;
  public userDetails: any;
  public response: any;
  public permission: any;

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let url: string = state.url;
    this.permission = route.data.permission;
    return this.checkLogin(url);

  }

  checkLogin(url: string) {
    //console.log("Url: " + url);

    //let val: string = this.tokenStorage.getUser().usertype;
    let val = this.tokenStorage.getUser();
    //console.log(val);
    //console.log(this.tokenStorage);
    if (val != null) {
      if (this.tokenStorage.getUser().misc) {
        this.userEmail = this.tokenStorage.getUser().misc.email;
        this.usertype = this.tokenStorage.getUser().usertype;
      }
      else {
        this.userDetails = JSON.parse(this.tokenStorage.getUser());
        //console.log(this.userDetails);
        this.userEmail = this.userDetails.email;
        this.usertype = this.userDetails.usertype;
      }
      //console.log("UserType: " + this.usertype);
      //console.log("True");

      switch (this.permission[0]) {
        case 'dashboard':
        case 'profile': {
          this.router.parseUrl(url);
          return true;
        }
        case 'adminpanel': {
          if (this.usertype == 11) {
            this.router.parseUrl(url);
            return true;
          }
          else {
            //console.log("Access Denied");
            this.router.navigateByUrl('access-denied');
            return false;
          }
        }
      }


    } else {
      //console.log("false");
      //this.router.navigate(['/login'], { queryParams: { returnUrl: url }});
      this.router.navigate(['/login']);
      return false;
    }
  }
}
