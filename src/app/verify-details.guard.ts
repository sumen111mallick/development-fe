import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyDetailsGuard implements CanActivate {

  phone_number_verify_status;
  val: {};
  response;
  return_value;

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>(obs => {
      this.userService.getUserPhoneDetails().subscribe(
        data => {
          console.log(data);
          if(data !== 1){
            this.router.navigateByUrl('verify-details');
            obs.next(false);
          }
          else {
            obs.next(true);
          }
        }
      );
    });
    
  }

}
