import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './_services/user.service';
import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyGuardGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router, private tokenStorage: TokenStorageService) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>(obs => {
      let val = this.tokenStorage.getUser();
      if (val != null) {
        this.userService.getUserPhoneDetails().subscribe(
          data => {
            console.log(data);
            if (data !== 1) {
              obs.next(true);
            }
            else {
              console.log("You have already verified your mobile number");
              this.router.navigateByUrl('/profile');
              obs.next(false);
            }
          }
        );
      }
      else {
        console.log("You are not logged in");
        obs.next(false);
        this.router.navigateByUrl('');
      }
    });
  }

}
