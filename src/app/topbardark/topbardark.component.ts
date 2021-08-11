import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from './../global-constants';
import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-topbardark',
  templateUrl: './topbardark.component.html',
  styleUrls: ['./topbardark.component.css']
})
export class TopbardarkComponent implements OnInit {

  currentUser: any;
  [x: string]: any;

  form: any = {};
  ared: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = null;
  userEmail: string[] = null;
  userProfile: string[] = null;
  ftpstring: string = GlobalConstants.ftpURL;
  data;
  wishlistcontent: any;
  wishlistresult: any;
  wishlist_length = 0;

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
    // this.currentUser = this.token.getUser().username;
    // console.log(this.data);
    if (this.tokenStorage.getToken() != null) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().username;
      this.userEmail = this.tokenStorage.getUser().misc.email;
      this.userProfile = this.tokenStorage.getUser().misc.profile_pic;
      console.log(this.userEmail);
      console.log(this.userProfile);
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
