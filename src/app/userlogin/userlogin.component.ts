import { GlobalConstants } from './../global-constants';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  form: any = {};
  ared: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  usertype: boolean = false;
  errorMessage = '';
  roles: string[] = [];
  productEntry: boolean = false;
  productEntrySale: boolean = false;
  productEntryRent: boolean = false;
  showLoadingIndicator: boolean = false;


  image1;
  image2;
  image3;
  image4;
  image5;

  furnish: boolean = false;

  maintenance: boolean = true;

  parking: boolean = false;

  amenityArray = [];
  varAmenity: string;

  furnishingArray = [];
  varfurnishing: string;

  text: string;

  err_code: number;
  access_token: string;
  data;


  constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.titleService.setTitle('Login');

    {
      this.route.queryParams.subscribe(params => {
        let token = params['token'];
        let data = params['data'];
        console.log(token);
        console.log(data);
        if (token != null) {
          this.tokenStorage.saveToken(token);
          console.log(this.tokenStorage.getToken());
          this.tokenStorage.saveUser(data);
          this.roles = this.tokenStorage.getUser().name;
        }
      })
    }

    console.log(this.tokenStorage.getUser())
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().username;
      if (this.tokenStorage.getUser().usertype == 1) {
        this.usertype = true;
        console.log(this.usertype);
      }
      this.showLoadingIndicator = false;
    }
    else {
      this.isLoggedIn = false;
      console.log(this.isLoggedIn);
      this.showLoadingIndicator = false;
    }


  }

  onSubmit(): void {
    this.showLoadingIndicator = true;
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.access_token);
        console.log(this.tokenStorage.getToken());
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().name;
        // this.router.navigate({"/productpage"})

        // this.router.navigate(["/profile"])
        // this.reloadPage();
        // window.location.href=GlobalConstants.siteURL+"";
        this.showLoadingIndicator = false;
        this.redirect_to_profile();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.err_code = err
        console.log(this.err_code);
        this.showLoadingIndicator = false;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  redirect_to_profile(): void {
    window.location.href = GlobalConstants.siteURL + "profile"
  }

  redirect_login_google(): void {
    window.location.href = GlobalConstants.googleURL
  }

  redirect_login_facebook(): void {
    window.location.href = GlobalConstants.fbURL
  }

  dashboard(): void {
    if (this.tokenStorage.getUser().usertype > 6) {
      window.location.href = GlobalConstants.siteURL + "adminpanel"
    }
    else {
      window.location.href = GlobalConstants.siteURL + "dashboard"
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.tokenStorage.signout();
    window.location.reload();
  }














}
