import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from './../global-constants';
import { InternalUserService } from './../_services/internal-user.service';

@Component({
  selector: 'app-admindashtopbar',
  templateUrl: './admindashtopbar.component.html',
  styleUrls: ['./admindashtopbar.component.css']
})
export class AdmindashtopbarComponent implements OnInit {

  name;
  usertype;
  isLoggedIn = false;
  userProfile: string[] = null;
  roles: string[] = null;
  userEmail: string[] = null;
  currentUser: any;
  public userDetails: any;
  ftpstring: string = GlobalConstants.ftpURL;
  
  public blog_access: boolean;
  public all_users_access: boolean;
  public properties_access: boolean;
  public requirements_access: boolean;
  public reviews_access: boolean;
  public lawyer_services_access: boolean;
  public loan_control_access: boolean;
  public user_creator_access: boolean;
  public roles_access: boolean;


  constructor(
    private tokenStorage: TokenStorageService,
    private internalUserService: InternalUserService
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken() != null) {
      this.isLoggedIn = true;
      //console.log(this.isLoggedIn);
      if (this.tokenStorage.getUser().misc) {
        this.roles = this.tokenStorage.getUser().username;
        this.userEmail = this.tokenStorage.getUser().misc.email;
        this.userProfile = this.tokenStorage.getUser().misc.profile_pic;
        this.currentUser = this.tokenStorage.getUser().username;
        this.usertype = this.tokenStorage.getUser().usertype;
        //console.log(this.usertype);
        //console.log(this.userProfile);
        //console.log(this.currentUser);
      }
      else {
        this.userDetails = JSON.parse(this.tokenStorage.getUser());
        this.roles = this.userDetails.name;
        this.userEmail = this.userDetails.email;
        this.userProfile = this.userDetails.profile_pic;
        this.usertype = this.userDetails.usertype;
        //console.log(this.userProfile);
      }

      switch (this.usertype) {
        case 11: {
          this.blog_access = true;
          this.all_users_access = true;
          this.properties_access = true;
          this.requirements_access = true;
          this.reviews_access = true;
          this.lawyer_services_access = true;
          this.loan_control_access = true;
          this.user_creator_access = true;
          this.roles_access = true;
          break;
        }
        case 8: {
          this.internalUserService.get_access_rights(this.userEmail).subscribe(
            data => {
              //console.log(data);
              //console.log(data[0].access_all_users);
              switch (data[0].access_all_users) {
                case "1": {
                  this.all_users_access = true;
                  break;
                }
                case "0": {
                  this.all_users_access = false;
                  break;
                }
              }

              switch (data[0].access_lawyer_services) {
                case "1": {
                  this.lawyer_services_access = true;
                  break;
                }
                case "0": {
                  this.lawyer_services_access = false;
                  break;
                }
              }

              switch (data[0].access_loan_control) {
                case "1": {
                  this.loan_control_access = true;
                  break;
                }
                case "0": {
                  this.loan_control_access = false;
                  break;
                }
              }

              switch (data[0].access_manage_blog) {
                case "1": {
                  this.blog_access = true;
                  break;
                }
                case "0": {
                  this.blog_access = false;
                  break;
                }
              }

              switch (data[0].access_properties) {
                case "1": {
                  this.properties_access = true;
                  break;
                }
                case "0": {
                  this.properties_access = false;
                  break;
                }
              }

              switch (data[0].access_requirements) {
                case "1": {
                  this.requirements_access = true;
                  break;
                }
                case "0": {
                  this.requirements_access = false;
                  break;
                }
              }

              switch (data[0].access_reviews) {
                case "1": {
                  this.reviews_access = true;
                  break;
                }
                case "0": {
                  this.reviews_access = false;
                  break;
                }
              }

              switch (data[0].access_user_creator) {
                case "1": {
                  this.user_creator_access = true;
                  break;
                }
                case "0": {
                  this.user_creator_access = false;
                  break;
                }
              }

              switch (data[0].access_manage_roles) {
                case "1": {
                  this.roles_access = true;
                  break;
                }
                case "0": {
                  this.roles_access = false;
                  break;
                }
              }

            },
            err => {
              //console.log(err);
            }
          );
          break;
        }
        default: {
          break;
        }
      }

    }
  }

}
