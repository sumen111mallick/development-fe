import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { GlobalConstants } from './../global-constants';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-topbardark-loader',
  templateUrl: './topbardark-loader.component.html',
  styleUrls: ['./topbardark-loader.component.css']
})
export class TopbardarkLoaderComponent implements OnInit {
  [x: string]: any;

  form: any = {};
  ared: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = null;
  wishlist_length = 0;
  ftpstring: string = GlobalConstants.ftpURL;
  public userDetails: any;

  data
  constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.on<string>().subscribe(
      (message: any) => {
        if (message == 'true') {
          this.wishlistcount();
        }
      }
    );
    /*this.data = this.tokenStorage.getToken();
    if (this.tokenStorage.getToken() != null) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().username;
      this.userEmail = this.tokenStorage.getUser().misc.email;
      this.userProfile = this.tokenStorage.getUser().misc.profile_pic;
      console.log(this.userEmail);
      console.log(this.userProfile);
      this.wishlistcount();

    } */

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
      }
      else {
        this.userDetails = JSON.parse(this.tokenStorage.getUser());
        this.roles = this.userDetails.name;
        this.userEmail = this.userDetails.email;
        this.userProfile = this.userDetails.profile_pic;
      }
      this.wishlistcount();

    }

  }
  wishlistcount(): void {
    this.userService.getwishlistdata().pipe().subscribe(
      (wishlistdata: any) => {
        this.wishlistcontent = wishlistdata.data;
        this.wishlistresult = this.wishlistcontent;
        this.wishlist_length = this.wishlistcontent.length;
        console.log(this.wishlistresult);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
