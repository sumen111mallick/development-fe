import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { GlobalConstants } from './../global-constants';
import { RouterModule } from '@angular/router';
import { HostListener } from "@angular/core";

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
  ftpstring: string = GlobalConstants.ftpURL;
  public userDetails: any;
  public wishlist_length:number= 0;
  public property_comp_length:number= 0;
  public devicetype:number;
  data:any;
  constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
  ) { 
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.userService.on<string>().subscribe(
      (message: any) => {
        if (message == 'true') {
          this.wishlistcount();
          this.pro_comp();
        }
      }
    );
    this.userService.pro_comp_on<string>().subscribe(
      (message: any) => {
        if (message == 'true') {
          this.pro_comp();
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

    //console.log(this.tokenStorage.getToken());
    //console.log(this.tokenStorage.getUser());
    if (this.tokenStorage.getToken() != null) {
      this.isLoggedIn = true;
      
      if (this.tokenStorage.getUser().misc) {
        this.roles = this.tokenStorage.getUser().username;
        this.userEmail = this.tokenStorage.getUser().misc.email;
        this.userProfile = this.tokenStorage.getUser().misc.profile_pic;
        this.currentUser = this.tokenStorage.getUser().username;
        this.usertype = this.tokenStorage.getUser().usertype;
      }
      else {
        this.userDetails = JSON.parse(this.tokenStorage.getUser());
        this.roles = this.userDetails.name;
        this.userEmail = this.userDetails.email;
        this.userProfile = this.userDetails.profile_pic;
      }
      this.wishlistcount();
      this.pro_comp();

    }

  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <768){
      this.devicetype=2;
    }else{
      this.devicetype=4;
    }
 }
  wishlistcount(): void {
    this.userService.getwishlistdata().pipe().subscribe(
      (wishlistdata: any) => {
        this.wishlistcontent = wishlistdata.data;
        this.wishlistresult = this.wishlistcontent;
        this.wishlist_length = this.wishlistcontent.length;
        //console.log(this.wishlistresult);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  pro_comp(): void{
    this.userService.get_pro_comp().pipe().subscribe(
      (wishlistdata: any) => {
        this.property_comp = wishlistdata.data;
        for (let i = 0; i < this.property_comp.length; i++) {
         if( this.property_comp.length<=this.devicetype){
           this.property_comp_length=this.property_comp.length;
         }
        }
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
