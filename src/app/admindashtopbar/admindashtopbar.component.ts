import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from './../global-constants';

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

  constructor(
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken() != null) {
      this.isLoggedIn = true;
      
      if (this.tokenStorage.getUser().misc) {
        this.roles = this.tokenStorage.getUser().username;
        this.userEmail = this.tokenStorage.getUser().misc.email;
        this.userProfile = this.tokenStorage.getUser().misc.profile_pic;
        this.currentUser = this.tokenStorage.getUser().username;
        this.usertype = this.tokenStorage.getUser().usertype;
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

}
