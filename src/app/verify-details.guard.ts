import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './_services/user.service';
import { TokenStorageService } from './_services/token-storage.service';
import { InternalUserService } from './_services/internal-user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyDetailsGuard implements CanActivate {

  phone_number_verify_status;
  val: {};
  response;
  return_value;
  public userEmail: string[] = null;
  private usertype: any;
  public userDetails: any;

  constructor(private userService: UserService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private internalUserService: InternalUserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>(obs => {

      let val = this.tokenStorage.getUser();
      console.log(val);
      console.log(this.tokenStorage);

      if (val != null) {
        if (this.tokenStorage.getUser().misc) {
          this.userEmail = this.tokenStorage.getUser().misc.email;
          this.usertype = this.tokenStorage.getUser().usertype;
        }
        else {
          this.userDetails = JSON.parse(this.tokenStorage.getUser());
          console.log(this.userDetails);
          this.userEmail = this.userDetails.email;
          this.usertype = this.userDetails.usertype;
        }

        console.log("UserType: " + this.usertype);
        switch (this.usertype) {
          case 3:
          case 4:
          case 5:
          case 11: {
            console.log("UserType: 3 or 4 or 5 or 11");
            console.log("True");
            /*this.userService.getUserPhoneDetails().subscribe(
              data => {
                console.log(data);
                if (data !== 1) {
                  this.router.navigateByUrl('verify-details');
                  obs.next(false);
                }
                else {
                  console.log("Mobile Number verified");
                  obs.next(true);
                }
              },
              err => {
                console.log(err);
              }
            ); */
            obs.next(true);
            break;
          }
          case 8: {
            console.log("UserType: 8");
            this.internalUserService.get_access_rights(this.userEmail).subscribe(
              data => {
                console.log(data);
                console.log(data[0]);
                this.response = data;
                console.log(this.response);
                if (data[0].access_list_property == 1) {
                  console.log("True");
                  obs.next(true);
                  /*this.userService.getUserPhoneDetails().subscribe(
                    data => {
                      console.log(data);
                      if (data !== 1) {
                        this.router.navigateByUrl('verify-details');
                        obs.next(false);
                      }
                      else {
                        obs.next(true);
                      }
                    }
                  );*/

                  //this.router.navigateByUrl('/insertproduct');
                  //obs.next(true);
                }
                else {
                  console.log("Access Denied");
                  this.router.navigateByUrl('access-denied');
                  obs.next(false);
                }
              },
              err => {
                console.log(err);
              }
            );
            break;
          }
        }
      }
      else {
        console.log("false");
        //this.router.navigate(['/login'], { queryParams: { returnUrl: url }});
        this.router.navigate(['/login']);
        obs.next(false);
      }

    });

  }

}
