import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insertselector',
  templateUrl: './insertselector.component.html',
  styleUrls: ['./insertselector.component.css']
})
export class InsertselectorComponent implements OnInit {

  isLoggedIn = false;
  usertype;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Create Listing');
    this.usertype = this.tokenStorage.getUser().usertype
    console.log(this.usertype)
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true
      if(this.usertype != 1){
        console.log(this.isLoggedIn)
      }
      else{
        this.redirect_to_profile();
      }
    }
    else{
      this.redirect_to_login();
    }
  }


  redirect_to_profile(): void {
    window.location.href=GlobalConstants.siteURL="profile"
  }

  redirect_to_login(): void {
    window.location.href=GlobalConstants.siteURL="login"
  }

}
