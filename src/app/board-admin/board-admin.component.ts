import { TokenStorageService } from './../_services/token-storage.service';
import { UserService } from './../_services/user.service';
import { ProductService } from './../_services/product.service';
import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  form: any = {};
  isLoggedIn: boolean = false;
  isLoginFailed;
  errorMessage;
  usertype
  roles;
  productEntry
  content

  constructor(
    private titleService: Title,
    private userService: UserService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private activeRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.titleService.setTitle('Admin Login');
    console.log(this.tokenStorage.getToken())
    if (this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().username;
    }

  }

  onSubmit(): void{
    this.authService.admin_login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.access_token);
        console.log(this.tokenStorage.getToken());
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().name;
        this.redirect_to_admin();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(err)
      }
    );

  }

  redirect_to_admin(){

    if(this.tokenStorage.getUser().usertype > 6){
      window.location.href=GlobalConstants.siteURL+"adminpanel"}
    else{
      window.location.href=GlobalConstants.siteURL+"dashboard"}

    // window.location.href=GlobalConstants.siteURL+"adminpanel"
  }


}
