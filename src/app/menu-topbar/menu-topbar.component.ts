import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalConstants } from './../global-constants';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from '../_services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-topbar',
  templateUrl: './menu-topbar.component.html',
  styleUrls: ['./menu-topbar.component.css']
})
export class MenuTopbarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

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
  public wishlist_length: number = 0;
  public property_comp_length: number = 0;
  public messageReceived: boolean;
  private logged_in: Subscription;

  constructor(private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private commonService: CommonService) { 
      this.logged_in = this.commonService.getUpdate().subscribe(
        message => {
          this.isLoggedIn = message;
        });
    }

  ngOnInit(): void {
    //console.log(this.isLoggedIn);

    this.userService.on<string>().subscribe(
      (message: any) => {
        if (message == 'true') {
          this.wishlistcount();
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

    // console.log(this.tokenStorage.getToken());
    //console.log(this.tokenStorage.getUser());
    //console.log(this.tokenStorage.getToken());
    console.log(this.isLoggedIn);
    if (this.tokenStorage.getToken() != null) {
      this.isLoggedIn = true;
      console.log(this.isLoggedIn);
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
    //console.log(this.isLoggedIn);

  }

  wishlistcount(): void {
    this.userService.getwishlistdata().pipe().subscribe(
      (wishlistdata: any) => {
        this.wishlistcontent = wishlistdata.data;
        this.wishlistresult = this.wishlistcontent;
        this.wishlist_length = this.wishlistcontent.length;
        //console.log(this.wishlist_length);
        //console.log(this.wishlistresult);
      },
      err => {
        this.content = err.error.message;
      }
    );
  }

  pro_comp(): void {
    this.userService.get_pro_comp().pipe().subscribe(
      (wishlistdata: any) => {
        this.property_comp = wishlistdata.data;
        this.property_comp_length = this.property_comp.length;
        //console.log(this.property_comp);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  compare_notification():void{
    this.toastr.info('Minimun Two Property required','Comparison', {
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
    });
  }

  log_out() {
    this.isLoggedIn = false;
    this.tokenStorage.removeToken();
    //console.log(this.isLoggedIn);
  }
}

