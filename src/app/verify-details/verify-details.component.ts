import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from './../_services/auth.service';
import { Router } from '@angular/router';
import { UrlService } from './../_services/url.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { PlansService } from '../_services/plans.service';
import { SubscriptionPlansComponent } from '../subscription-plans/subscription-plans.component';
import { GlobalConstants } from './../global-constants';

@Component({
  selector: 'app-verify-details',
  templateUrl: './verify-details.component.html',
  styleUrls: ['./verify-details.component.css']
})
export class VerifyDetailsComponent implements OnInit {

  currentUser: any;
  public currentUserId: any;
  verify: boolean = false;
  errorMessage: string;
  number: string;
  isVerified: boolean = false;
  isFailedVerify: boolean = false;
  isFailedVerify_otp: boolean = false;
  public showLoadingIndicator: boolean = false;
  submitted: boolean = false;
  otp_submitted: boolean = false;
  public previousUrl: string;
  public plansData: any;
  public user_id: any;
  public userEmail: string[] = null;
  public userDetails: any;
  public property_data: any;

  public paytm_data: any;
  public paytm_form_url: string = GlobalConstants.Paytm_formURL;

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private urlService: UrlService,
    private planscomp: SubscriptionPlansComponent,
    private plansService: PlansService) { }

  verifyForm = this.fb.group({
    form_phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
  });

  otpForm = this.fb.group({
    otp_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  get f() {
    return this.verifyForm.controls;
  }

  get g() {
    return this.otpForm.controls;
  }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    //this.previousUrl = this.urlService.getPreviousUrl();
    this.previousUrl = this.tokenStorage.getReturnURL();

    this.userService.getUserBoard().pipe().subscribe(
      (data: any) => {
        console.log(data);
        this.currentUser = data.name;
        this.currentUserId = data.id;
        this.showLoadingIndicator = false;
      },
      err => {
        //console.log(err);
        this.showLoadingIndicator = false;
      }
    );

    if (this.tokenStorage.getToken()) {
      if (this.tokenStorage.getUser().misc) {
        this.userEmail = this.tokenStorage.getUser().misc.email;
        this.user_id = this.tokenStorage.getUser().id;
      }
      else {
        this.userDetails = JSON.parse(this.tokenStorage.getUser());
        //console.log(this.userDetails);
        this.userEmail = this.userDetails.email;
        this.user_id = this.userDetails.id;
      }
    }

  }

  onSubmit() {
    this.showLoadingIndicator = true;
    //console.log("Submitted");
    //console.log(this.verify);
    this.submitted = true;

    if (this.verifyForm.invalid) {
      this.showLoadingIndicator = false;
      return;
    }

    this.authService.mobile_verify(this.verifyForm.value.form_phone, this.currentUserId).subscribe(
      data => {
        //console.log(data);
        this.verify = true;
        //console.log(this.verify);
        this.number = this.verifyForm.value.form_phone;
        this.showLoadingIndicator = false;
      },
      err => {
        this.errorMessage = err.error;
        this.isFailedVerify = true;
        //console.log(err);
        this.showLoadingIndicator = false;
      }
    );
  }

  onSubmitotp(): void {
    {
      this.showLoadingIndicator = true;
      this.otp_submitted = true;

      if (this.otpForm.invalid) {
        this.showLoadingIndicator = false;
        return;
      }
      this.authService.verify_mobile(this.number, this.otpForm.value.otp_password, this.currentUserId).subscribe(

        data => {
          //console.log(data);
          this.isVerified = true;
          this.verify = false;
          //this.router.navigateByUrl('profile');
          // this.router.navigateByUrl(this.previousUrl);
          this.showLoadingIndicator = false;
          console.log(this.previousUrl);
          if (this.previousUrl == '/plans') {
            this.plansData = JSON.parse(this.tokenStorage.getPlansData());
            this.plansData['user_id'] = this.user_id;
            this.plansData['user_email'] = this.userEmail;

            this.plansService.postSelectedPlan(this.plansData).subscribe(
              res => {
                console.log(res);
                if (res.data.plan_type == 'let_out') {
                  this.router.navigate(['/payment-summary'], { queryParams: { 'orderID': res.data.order_id } });
                }
                else if (res.data.plan_type == 'rent') {
                  this.router.navigate(['plans']);
                  this.planscomp.openMessageModal();
                }

              },
              err => {

              }
            );
          }
          else if (this.previousUrl.includes('pro_payment_summary')) {
            console.log(this.previousUrl);
            this.property_data = JSON.parse(this.tokenStorage.getPlansData());
            console.log(this.property_data);
            this.property_data.user_id = this.user_id;
            this.property_data.user_email = this.userEmail;
            console.log(this.property_data);

            this.plansService.postSelectedRentPlan(this.property_data).subscribe(
              res => {
                console.log(res);  
                if(this.property_data.payment_mode == 'Online') {
                  console.log(this.property_data.payment_mode);
                  this.plansService.proceedToPaymentRent(res.data.order_id).subscribe(
                    result => {
                      console.log(result);
                      if (result.status == 201) {
                        this.paytm_data = result.data;
                        this.createPaytmForm();
                      }
                      else {
              
                      }
                    },
                    error => {
                      console.log(error);
                    }
                  );
                }   
                else if (this.property_data.payment_mode == 'Cash') {
                  console.log(this.property_data.payment_mode);
                  this.plansService.generateRentInvoice(res.data.order_id).subscribe(
                    result => {
                      console.log(result);
                      this.router.navigate(['/invoice'], { queryParams: { 'invoice_no': result.data } });
                    },
                    err => {
                      console.log(err);
                    }
                  );
                }
                
              },
              err => {
  
              }
            );
          }
          else {
            this.router.navigateByUrl(this.previousUrl)
              .then(() => {
                window.location.reload();
              });
          }
        },
        err => {
          this.errorMessage = err.error;
          this.verify = true;
          this.isFailedVerify_otp = true;
          //console.log(err);
          this.showLoadingIndicator = false;
        }
      );
    }
  }

  createPaytmForm() {
    const my_form: any = document.createElement('form');
    my_form.name = 'paytm_form';
    my_form.method = 'post';
    my_form.action = this.paytm_form_url;

    const myParams = Object.keys(this.paytm_data);
    for (let i = 0; i < myParams.length; i++) {
      const key = myParams[i];
      let my_tb: any = document.createElement('input');
      my_tb.type = 'hidden';
      my_tb.id = key;
      my_tb.name = key;
      my_tb.value = this.paytm_data[key];
      my_form.appendChild(my_tb);
    };
    // console.log(my_form);
    document.body.appendChild(my_form);
    my_form.submit();
    // after click will fire you will redirect to paytm payment page.
    // after complete or fail transaction you will redirect to your CALLBACK URL
  }

}
