import { GlobalConstants } from './../global-constants';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { filter, pairwise } from 'rxjs/operators';
import { UrlService } from './../_services/url.service';
import { RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
import { PlansService } from '../_services/plans.service';
import { UserLogsService } from './../_services/user-logs.service';

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

  //previousUrl: any = this.urlService.previousUrl$;
  currentUrl: string = null;

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
  public returnUrl: any;
  public previous: any;
  public previousUrl: string;
  pro_id: any = null;
  type: any;
  device_info: any;
  browser_info: any;
  url_info: string;
  url: any;
  input_info: any = null;
  user_cart: any = null;
  ip_address: any;
  ipAddress: string;
  userEmail: any;

  public user_id: any;
  //public userEmail: string[] = null;
  public userDetails: any;
  public plansData: any;
  public plansDataArray = [];

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private userlogs: UserLogsService,
    private commonService: CommonService,
    private urlService: UrlService,
    private userService: UserService,
    private plansService: PlansService
  ) { }

  ngOnInit(): void {

    this.showLoadingIndicator = true;
    this.titleService.setTitle('Login');
    this.previousUrl = this.tokenStorage.getReturnURL();
    this.url_info = this.userlogs.geturl();
    this.device_info = this.userlogs.getDeviceInfo();
    this.browser_info = this.userlogs.getbrowserInfo();
    this.ip_address = this.userlogs.getIpAddress();
    // console.log(this.device_info);
    // console.log(this.browser_info);
    // console.log(this.url_info);
    // console.log(this.ip_address);

    /*console.log(this.urlService.getPreviousUrl());*/
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //console.log(this.returnUrl);

    /*this.previous = this.urlService.getPreviousUrl();
    console.log(this.previous); */

    /*this.urlService.previousUrl$
       .subscribe((previousUrl: string) => {
         this.previousUrl = previousUrl
       });*/

    /*this.urlService.previousUrl$.subscribe((previousUrl: string) => {
      console.log('previous url: ', previousUrl);
    }); */

    /*this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);
      }); */

    /* this.router.events
       .pipe(filter(event => event instanceof NavigationEnd))
       .subscribe((event: NavigationEnd) => {
         console.log('prev:', event.url);
         this.previousUrl = event.url;
       }); */

    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      let data = params['data'];
      // console.log(token);
      // console.log(data);
      if (token != null) {

        this.tokenStorage.saveToken(token);
        //console.log(this.tokenStorage.getToken());
        this.tokenStorage.saveUser(data);
        this.roles = this.tokenStorage.getUser().name;
      }
    });


    //console.log(this.tokenStorage.getUser())
    if (this.tokenStorage.getToken()) {
      if (this.tokenStorage.getUser().misc) {
        this.userEmail = this.tokenStorage.getUser().misc.email;
        this.usertype = this.tokenStorage.getUser().usertype;
        this.user_id = this.tokenStorage.getUser().id;
      }
      else {
        this.userDetails = JSON.parse(this.tokenStorage.getUser());
        //console.log(this.userDetails);
        this.userEmail = this.userDetails.email;
        this.usertype = this.userDetails.usertype;
        this.user_id = this.userDetails.id;
      }
      this.isLoggedIn = true;
      this.isLoginFailed = false;
      console.log(this.isLoggedIn);
      this.roles = this.tokenStorage.getUser().username;
      if (this.tokenStorage.getUser().usertype == 1) {
        this.usertype = true;
        //console.log(this.usertype);
      }
      this.showLoadingIndicator = false;
      this.commonService.sendUpdate(this.isLoggedIn);
      this.returnUrl = this.tokenStorage.getReturnURL();
      /*if(this.returnUrl == '/plans') {
        this.getPhoneDetails();
      }
      else {
        this.router.navigateByUrl(this.returnUrl);
      }*/
      switch (this.returnUrl) {
        case '/plans': {
          this.getPhoneDetails();
          break;
        }
        case '/logout': {
          this.router.navigateByUrl('');
          break;
        }
        default: {
          this.router.navigateByUrl(this.returnUrl);
          break;
        }
      }

      //this.router.navigateByUrl(this.returnUrl);
      /*.then(() => {
        window.location.reload();
      });*/
    }
    else {
      this.isLoggedIn = false;
      //console.log(this.isLoggedIn);
      this.showLoadingIndicator = false;
    }


  }

  onSubmit(): void {
    this.showLoadingIndicator = true;
    this.authService.login(this.form).subscribe(
      data => {
        //console.log(data.access_token);
        this.tokenStorage.saveToken(data.access_token);
        //console.log(this.tokenStorage.getToken());
        this.tokenStorage.saveUser(data);
        console.log(this.ip_address);
        console.log(data.user_data);
        // user logs funtionalty
        if (data.user_data) {
          this.userEmail = data.email;
          this.type = "login_page";
          this.input_info = data.user_data;
          this.authService.user_logs(this.ip_address, this.device_info, this.browser_info, this.url_info, this.pro_id, this.type, this.userEmail, this.input_info, this.user_cart).subscribe(
            data => {
              this.showLoadingIndicator = false;
              console.log(data);
              this.router.navigateByUrl("")
                .then(() => {
                  window.location.reload();
                });
            }
          );

        }
        // user logs funtionalty

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().name;
        // this.router.navigate({"/productpage"})

        // this.router.navigate(["/profile"])
        // this.reloadPage();
        // window.location.href=GlobalConstants.siteURL+"";
        // this.showLoadingIndicator = false;
        // this.router.navigateByUrl("")
        //   .then(() => {
        //     window.location.reload();
        //   });
        //this.router.navigateByUrl(this.returnUrl);
        //this.redirect_to_profile();
        //this.router.navigateByUrl(this.previousUrl);
        //this.urlService.router.navigateByUrl(this.previous);

        /*this.urlService.previousUrl$.subscribe((previousUrl: string) => {
          console.log('previous url: ', previousUrl);

        }); */

        /*this.router.navigate(this.previousUrl.source._value);

        console.log(this.previousUrl);
        console.log(this.currentUrl); */

        /*this.router.navigateByUrl(this.urlService.getPreviousUrl())
        .then(() => {
          window.location.reload();
        });*/
        this.showLoadingIndicator = false;
        this.commonService.sendUpdate(this.isLoggedIn);
        console.log(this.tokenStorage.getUser());
        if (this.tokenStorage.getUser().misc) {
          this.userEmail = this.tokenStorage.getUser().misc.email;
          this.usertype = this.tokenStorage.getUser().usertype;
          this.user_id = this.tokenStorage.getUser().id;
        }
        else {
          this.userDetails = JSON.parse(this.tokenStorage.getUser());
          //console.log(this.userDetails);
          this.userEmail = this.userDetails.email;
          this.usertype = this.userDetails.usertype;
          this.user_id = this.userDetails.id;
        }
        this.returnUrl = this.tokenStorage.getReturnURL();
        console.log(this.returnUrl);
        /*if(this.returnUrl == '/plans') {
          this.getPhoneDetails();
        }
        else {
          this.router.navigateByUrl(this.returnUrl);
        }*/

        switch (this.returnUrl) {
          case '/plans': {
            this.getPhoneDetails();
            break;
          }
          case '/logout': {
            this.router.navigateByUrl('');
            break;
          }
          default: {
            this.router.navigateByUrl(this.returnUrl);
            break;
          }
        }

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.err_code = err
        //console.log(this.err_code);
        this.showLoadingIndicator = false;
      }
    );
  }

  getPhoneDetails(): void {
    this.userService.getUserPhoneDetails().subscribe(
      data => {
        if (data !== 1) {
          console.log("Mobile number not verified");
          //this.tokenStorage.saveReturnURL('verify-details');
          this.router.navigate(['verify-details']);
        }
        else {
          console.log("Mobile number verified");
          this.plansData = JSON.parse(this.tokenStorage.getPlansData());
          console.log(typeof (this.plansData));
          console.log(this.plansData);

          this.plansData['user_id'] = this.user_id;
          this.plansData['user_email'] = this.userEmail;

          this.plansService.postSelectedPlan(this.plansData).subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/payment-summary'], { queryParams: { 'orderID': res.data.order_id } });
            },
            err => {

            }
          );
        }
      },
      err => {
        console.log(err);
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
