import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { GlobalConstants } from './../global-constants';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  [x: string]: any;

  form: any = {};
  ared: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = null;
  data;
  userEmail: string[] = null;
  userProfile: string[] = null;
  ftpstring: string = GlobalConstants.ftpURL;
  wishlist_length= 0;


  constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,

    ) { }
  ngOnInit(): void {
    this.userService.on<string>().subscribe(
      (message: any) => {
        if(message=='true'){
          this.wishlistcount();
        }
      }
    );
   
    /*if (this.tokenStorage.getToken() != null){
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().username;
      this.userEmail=this.tokenStorage.getUser().misc.email;
      this.userProfile=this.tokenStorage.getUser().misc.profile_pic;
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
  wishlistcount(): void{
    this.userService.getwishlistdata().pipe().subscribe(
      (wishlistdata: any) => {
        this.wishlistcontent = wishlistdata.data;
        this.wishlistresult = this.wishlistcontent;
        this.wishlist_length=this.wishlistcontent.length;
        console.log(this.wishlist_length);
        console.log(this.wishlistresult);
      },
      err => {
        this.content = err.error.message;
      }
    );
  }
  


}
