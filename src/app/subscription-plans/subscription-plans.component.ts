import { Component, OnInit } from '@angular/core';
import { PlansService } from './../_services/plans.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { TokenStorageService } from './../_services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../_services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';

interface PriceRange {
  range: string;
  value: number;
}

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css']
})
export class SubscriptionPlansComponent implements OnInit {

  public showLoadingIndicator: boolean = false;
  public response: any;
  public letout_response: any;
  public rent_feat_res: any;
  public letout_feat_res: any;
  public myArray: any = [];
  public myArray_lo: any = [];
  public plan_price: number;
  public payable_amount: number;

  public userEmail: string[] = null;
  private usertype: any;
  public userDetails: any;
  public user_id: any;
  public resp_code: any;
  public returnUrl: string;


  budgetForm = new FormGroup({
    budget_amount: new FormControl('5000', [Validators.required, Validators.max(50000), Validators.min(5000)])
  });

  expectedRentForm = new FormGroup({
    expected_rent_amount: new FormControl('5000', [Validators.required, Validators.max(50000), Validators.min(5000)])
  });

  constructor(private plansService: PlansService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    public matDialog: MatDialog,
    private route: ActivatedRoute) { }

  get f() {
    return this.budgetForm.controls;
  }

  get g() {
    return this.expectedRentForm.controls;
  }

  ngOnInit(): void {

    this.resp_code = this.route.snapshot.queryParams['status'];
    if (this.resp_code == 141) {
      this.toastr.info("Transaction Cancelled");
      this.router.navigate(['plans']);
    }
    if (this.resp_code == 227) {
      this.toastr.info("Your payment has been declined by your bank.");
      this.router.navigate(['plans']);
    }
    if (this.resp_code == 402) {
      this.toastr.info("Looks like the payment is not complete.");
      this.router.navigate(['plans']);
    }
    this.showLoadingIndicator = true;
    this.plansService.getRentPlans().subscribe(
      res => {
        this.response = res;
        console.log(this.response);
      },
      err => {

      }
    );

    this.plansService.getLetOutPlans().subscribe(
      res => {
        this.letout_response = res;
        console.log(this.letout_response);
      },
      err => {
        console.log(err);
      }
    );

    this.plansService.getRentFeatures().subscribe(
      res => {
        this.rent_feat_res = res;
        for (let feat_res in this.rent_feat_res) {
          console.log(this.rent_feat_res[feat_res].feature_details);
          this.myArray = this.rent_feat_res[feat_res].feature_details.split(',');
          console.log(this.myArray);
          this.rent_feat_res[feat_res].feature_details = this.myArray;
        }
        console.log(this.rent_feat_res);
      },
      err => {
        console.log(err);
      }
    );

    this.plansService.getLetOutFeatures().subscribe(
      res => {
        this.letout_feat_res = res;
        for (let feat_res_lo in this.letout_feat_res) {
          console.log(this.letout_feat_res[feat_res_lo].feature_details);
          this.myArray_lo = this.letout_feat_res[feat_res_lo].feature_details.split(',');
          console.log(this.myArray_lo);
          this.letout_feat_res[feat_res_lo].feature_details = this.myArray_lo;
          this.showLoadingIndicator = false;
        }
        console.log(this.letout_feat_res);
      },
      err => {
        console.log(err);
        this.showLoadingIndicator = false;
      }
    );

  }

  value: number = 5000;
  options: Options = {
    floor: 5000,
    ceil: 50000,
    step: 500,
    animate: true,
    showSelectionBar: true,
    translate: (value: number, label): string => {
      return this.commaSeperated(value);
    }
  };

  expected_rent_value: number = 5000;
  exp_rent_options: Options = {
    floor: 5000,
    ceil: 50000,
    step: 500,
    animate: true,
    showSelectionBar: true,
    translate: (value: number, label): string => {
      return this.commaSeperated(value);
    }
  };

  commaSeperated(e) {
    var t = (e = e ? e.toString() : "").substring(e.length - 3)
      , n = e.substring(0, e.length - 3);
    return "" !== n && (t = "," + t),
      n.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + t
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  plan_payment(plan_name, plan_id, payment_type, plan_type, expected_rent, price_duration) {
    this.showLoadingIndicator = true;
    let val = this.tokenStorage.getUser();
    if (val != null) {
      console.log(val);
      this.userService.getUserPhoneDetails().subscribe(
        data => {
          //console.log(data);
          if (data !== 1) {
            console.log("Mobile number not verified");
            this.returnUrl = this.router.url;
            this.showLoadingIndicator = false;
            this.tokenStorage.saveReturnURL(this.returnUrl);
            this.openModal(plan_name, plan_id, payment_type, plan_type, expected_rent, price_duration);
          }
          else {
            console.log("Mobile number verified");
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
            var formData: any = new FormData();
            formData.append('user_id', this.user_id);
            formData.append('user_email', this.userEmail);
            formData.append('plan_type', plan_type);
            formData.append('plan_name', plan_name);
            formData.append('expected_rent', expected_rent);
            formData.append('plan_id', plan_id);
            formData.append('payment_type', payment_type);

            this.plan_price = expected_rent / (30 / price_duration);
            formData.append('plan_price', this.plan_price);

            console.log(plan_name, plan_id, payment_type, plan_type, expected_rent, price_duration, this.plan_price);

            this.showLoadingIndicator = false;
            this.plansService.postSelectedPlan(formData).subscribe(
              res => {
                console.log(res);
                this.router.navigate(['/payment-summary'], { queryParams: { 'orderID': res.data.order_id } });
              },
              err => {

              }
            );

          }
        }
      );
    }
    else {
      console.log("Not logged in: " + val);
      console.log(this.router.url);
      this.showLoadingIndicator = false;
      /*this.toastr.info("Please login to continue");
      this.router.navigate(['/login'], { queryParams: { 'redirect_url': this.router.url } });*/
      this.openLoginModal(plan_name, plan_id, payment_type, plan_type, expected_rent, price_duration);
    }
  }

  openModal(plan_name, plan_id, payment_type, plan_type, expected_rent, price_duration) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "250px";
    dialogConfig.width = "600px";
    //const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    const modalDialog = this.matDialog.open(ModalComponent, {
      width: '600px',
      height: '250px',
      id: 'modal-component',
      disableClose: true,
      data: { 
        plan_name: plan_name, 
        plan_id: plan_id, 
        payment_type: payment_type, 
        plan_type: plan_type, 
        expected_rent: expected_rent, 
        price_duration: price_duration 
      }
    });
  }

  openLoginModal(plan_name, plan_id, payment_type, plan_type, expected_rent, price_duration) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-login-component";
    dialogConfig.height = "250px";
    dialogConfig.width = "600px";
    //const modalLoginDialog = this.matDialog.open(LoginModalComponent, dialogConfig);
    const modalLoginDialog = this.matDialog.open(LoginModalComponent, {
      width: '600px',
      height: '250px',
      id: 'modal-login-component',
      disableClose: true,
      data: { 
        plan_name: plan_name, 
        plan_id: plan_id, 
        payment_type: payment_type, 
        plan_type: plan_type, 
        expected_rent: expected_rent, 
        price_duration: price_duration 
      }
    });
  }
}
