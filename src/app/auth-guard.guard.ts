import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InternalUserService } from './_services/internal-user.service';
import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  public currentUser: any;
  public roles: string[] = null;
  public userEmail: string[] = null;
  private usertype: any;
  public userDetails: any;
  public slug: any;
  public response: any;
  public permission: any;

  public blog_access: boolean;
  public all_users_access: boolean;
  public properties_access: boolean;
  public requirements_access: boolean;
  public reviews_access: boolean;
  public lawyer_services_access: boolean;
  public loan_control_access: boolean;
  public user_creator_access: boolean;
  public roles_access: boolean;

  constructor(private router: Router,
    private internalUserService: InternalUserService,
    private tokenStorage: TokenStorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>(obs => {

      let url: string = state.url;
      this.permission = route.data.permission;

      console.log(route.data);
      console.log("Permission: " + this.permission);
      console.log("State: " + state);
      console.log("Url: " + url);

      if (this.tokenStorage.getToken() != null) {
        console.log("User Logged In");

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
        console.log(this.usertype);

        if (this.usertype > 6) {

          this.internalUserService.get_access_rights(this.userEmail).subscribe(
            data => {
              console.log(data);
              console.log(data[0]);
              this.response = data;
              console.log(this.response);

              switch (this.permission[0]) {
                case 'access_all_users': {
                  console.log("All Users");
                  if (this.response[0].access_all_users == 1) {
                    obs.next(true);
                  }
                  else {
                    console.log("Access Denied");
                    this.router.navigateByUrl('access-denied');
                    obs.next(false);
                  }
                  break;
                }

                case 'access_lawyer_services': {
                  console.log("Lawyer Services");
                  if (this.response[0].access_lawyer_services == 1) {
                    obs.next(true);
                  }
                  else {
                    console.log("Access Denied");
                    this.router.navigateByUrl('access-denied');
                    obs.next(false);
                  }
                  break;
                }

                case 'access_loan_control': {
                  console.log("Loan Control");
                  if (this.response[0].access_loan_control == 1) {
                    obs.next(true);
                  }
                  else {
                    console.log("Access Denied");
                    this.router.navigateByUrl('access-denied');
                    obs.next(false);
                  }
                  break;
                }

                case 'access_manage_blog': {
                  console.log("Manage Blog");
                  if (this.response[0].access_manage_blog == 1) {
                    obs.next(true);
                  }
                  else {
                    console.log("Access Denied");
                    this.router.navigateByUrl('access-denied');
                    obs.next(false);
                  }
                  break;
                }

                case 'access_manage_roles': {
                  console.log("Manage Roles");
                  if (this.response[0].access_manage_roles == 1) {
                    obs.next(true);
                  }
                  else {
                    console.log("Access Denied");
                    this.router.navigateByUrl('access-denied');
                    obs.next(false);
                  }
                  break;
                }

                case 'access_properties': {
                  if (this.response[0].access_properties == 1) {
                    obs.next(true);
                  }
                  else {
                    console.log("Access Denied");
                    this.router.navigateByUrl('access-denied');
                    obs.next(false);
                  }
                  break;
                }

                case 'access_requirements': {
                  if (this.response[0].access_requirements == 1) {
                    obs.next(true);
                  }
                  else {
                    console.log("Access Denied");
                    this.router.navigateByUrl('access-denied');
                    obs.next(false);
                  }
                  break;
                }

                case 'access_reviews': {
                  if (this.response[0].access_reviews == 1) {
                    obs.next(true);
                  }
                  else {
                    console.log("Access Denied");
                    this.router.navigateByUrl('access-denied');
                    obs.next(false);
                  }
                  break;
                }

                case 'access_user_creator': {
                  if (this.response[0].access_user_creator == 1) {
                    obs.next(true);
                  }
                  else {
                    console.log("Access Denied");
                    this.router.navigateByUrl('access-denied');
                    obs.next(false);
                  }
                  break;
                }
              }
            },
            err => {
              console.log(err);
            }
          );
        }
        else {
          console.log("User logged in but is an external User. Access Denied");
          this.router.navigateByUrl('access-denied');
          obs.next(false);
        }

      }
      else {
        console.log("User not logged in. Access Denied");
        this.router.navigateByUrl('access-denied');
        obs.next(false);
      }


      /* this.internalUserService.get_access_rights(this.userEmail).subscribe(
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
       ); */
    });

  }
}

