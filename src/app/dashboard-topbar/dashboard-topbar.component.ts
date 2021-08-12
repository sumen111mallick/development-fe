import { GlobalConstants } from './../global-constants';
import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-topbar',
  templateUrl: './dashboard-topbar.component.html',
  styleUrls: ['./dashboard-topbar.component.css']
})
export class DashboardTopbarComponent implements OnInit {

  currentUser: any;
  usertype;
  isLoggedIn = false;
  roles: string[] = null;
  userEmail: string[] = null;
  userProfile: string[] = null;
  ftpstring: string = GlobalConstants.ftpURL;
  public userDetails: any;

  constructor(
    private token: TokenStorageService,
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken());
    console.log(this.tokenStorage.getUser());
    if (this.tokenStorage.getToken() != null) {
      this.isLoggedIn = true;
      
      if (this.tokenStorage.getUser().misc) {
        this.roles = this.tokenStorage.getUser().username;
        this.userEmail = this.tokenStorage.getUser().misc.email;
        this.userProfile = this.tokenStorage.getUser().misc.profile_pic;
        this.currentUser = this.token.getUser().username;
        this.usertype = this.token.getUser().usertype;
        console.log(this.userProfile);
      }
      else {
        this.userDetails = JSON.parse(this.tokenStorage.getUser());
        this.roles = this.userDetails.name;
        this.userEmail = this.userDetails.email;
        this.userProfile = this.userDetails.profile_pic;
        console.log(this.userProfile);
      }

    }
  }


  redirect_control(): void {
    if (this.usertype == 4) {
      window.location.href = GlobalConstants.siteURL + "lawyerservice"
    }
    else {
      window.location.href = GlobalConstants.siteURL + "dashboard"
    }
  }

}
