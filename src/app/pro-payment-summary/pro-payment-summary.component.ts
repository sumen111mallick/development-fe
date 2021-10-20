import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlansService } from './../_services/plans.service';
import { GlobalConstants } from './../global-constants';
import { ProductService } from '../_services/product.service';
import { MatRadioChange } from '@angular/material/radio';
import { TokenStorageService } from './../_services/token-storage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { MatExpansionPanel } from '@angular/material/expansion';
import { UserService } from './../_services/user.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-pro-payment-summary',
  templateUrl: './pro-payment-summary.component.html',
  styleUrls: ['./pro-payment-summary.component.css']
})
export class ProPaymentSummaryComponent implements OnInit {

  public order_id: any;
  public response: any;
  public price_amount: any;
  public gst_amount: any;
  public total_amount_hs: any;

  public paytm_data: any;
  public content: any;
  public paytm_form_url: string = GlobalConstants.Paytm_formURL;
  public mode_payment: any = 'Online';
  // public plan_select: any = 'Rent-Plan-vip-2';
  public product_id: any;
  public product_data: any;
  public security_deposit: any;
  public security_dep_month: number;
  public total_amount_owner: number;
  public expected_rent: any;
  public security_dep_amount: any;
  public maintenance_charge: any;
  public showLoadingIndicator: boolean = false;

  public plan_name: any;
  public plan_price: any;
  public rent_feat_res: any;
  public myArray: any = [];
  public plan_id: any;
  public payment_type: any;
  public plan_type: any;
  public property_name: any;
  public property_id: any;
  public total_amount: any;

  public returnUrl: string;

  step = 0;

  public userEmail: any;
  public user_id: any;
  public userDetails: any;

  constructor(
    private route: ActivatedRoute,
    private planService: PlansService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    public matDialog: MatDialog,
    private userService: UserService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.order_id = this.route.snapshot.queryParams['orderID'];
    console.log(this.order_id);

    this.product_id = this.route.snapshot.queryParams['productID'];
    this.productService.get_product_details(this.product_id).subscribe(
      prod_data => {
        this.showLoadingIndicator = false;
        this.product_data = prod_data[0];
        console.log(this.product_data);
        this.expected_rent = this.product_data.expected_rent;
        this.gst_amount = (18 * this.plan_price) / 100;
        this.total_amount_hs = this.plan_price + this.gst_amount;
        this.security_deposit = this.product_data.security_deposit;

        this.security_dep_amount = this.expected_rent * this.security_deposit;
        this.maintenance_charge = this.product_data.maintenance_charge;
        console.log(this.maintenance_charge);
        if (this.maintenance_charge) {
          this.total_amount_owner = Number(this.expected_rent) + Number(this.security_dep_amount) + Number(this.maintenance_charge);
        }
        else {
          this.total_amount_owner = Number(this.expected_rent) + Number(this.security_dep_amount);
          console.log(this.maintenance_charge);
          this.maintenance_charge = 0;
          console.log(this.maintenance_charge);
        }
      },
      err => {
        this.showLoadingIndicator = false;
        console.log(err);
      }
    );

    /*this.planService.getRentOrderDetails(this.order_id).subscribe(
      res => {
        console.log(res);
        this.response = res[0];
        this.price_amount = this.response.plan_price;
        this.gst_amount = (18 * this.price_amount) / 100;
        this.total_amount = this.price_amount + this.gst_amount;
        this.payment_type = this.response.payment_type;
      },
      err => {
        console.log(err);
      }
    );*/
    this.showLoadingIndicator = true;
    this.planService.getRentPlans().subscribe(
      res => {
        this.showLoadingIndicator = false;
        this.response = res;
        console.log(this.response);
      },
      err => {
        this.showLoadingIndicator = false;
      }
    );
    this.showLoadingIndicator = true;
    this.planService.getRentFeatures().subscribe(
      res => {
        this.showLoadingIndicator = false;
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
        this.showLoadingIndicator = false;
        console.log(err);
      }
    );
  }

  proceedToPayment() {
    var formData: any = new FormData();
    formData.append('plan_name', this.plan_name);
    formData.append('plan_price', this.plan_price);
    formData.append('plan_type', 'rent');
    formData.append('plan_id', this.plan_id);
    formData.append('payment_type', this.payment_type);
    formData.append('expected_rent', this.expected_rent);
    formData.append('property_name', this.product_data.build_name);
    formData.append('property_id', this.product_data.id);
    formData.append('gst_amount', this.gst_amount);
    formData.append('maintenance_charge', this.maintenance_charge);
    formData.append('security_deposit', this.security_dep_amount);
    formData.append('total_amount', this.total_amount_hs + this.total_amount_owner);
    formData.append('property_uid', this.product_data.product_uid);
    formData.append('payment_mode', this.mode_payment);
    
    let val = this.tokenStorage.getUser();
    if (val != null) {
      console.log(val);
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
      this.userService.getUserPhoneDetails().subscribe(
        data => {
          if (data !== 1) {
            console.log("Mobile number not verified");
            this.returnUrl = this.router.url;
            this.tokenStorage.saveReturnURL(this.returnUrl);
            this.openModal();
          }
          else {
            console.log("Mobile number verified");
            formData.append('user_id', this.user_id);
            formData.append('user_email', this.userEmail);
            this.planService.postSelectedRentPlan(formData).subscribe(
              res => {
                console.log(res);
                this.planService.proceedToPaymentRent(res.data.order_id).subscribe(
                  result => {
                    console.log(result);
                    if (result.status == 201) {
                      this.paytm_data = result.data;
                      this.createPaytmForm();
                    }
                  },
                  error => {
                    console.log(error);
                  }
                );
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
      console.log("Not logged in: " + val);
      console.log(this.router.url);
      this.openLoginModal();
    }

    // this.planService.proceedToPaymentRent(formData).subscribe(
    //   res => {
    //     console.log(res);
    //     if (res.status == 201) {
    //       this.paytm_data = res.data;
    //       this.createPaytmForm();
    //     }
    //     else {

    //     }
    //   },
    //   err => {
    //     this.content = err.error.message;
    //   }
    // );
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

  openLoginModal() {

    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-login-component";
    dialogConfig.height = "250px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      plan_name: this.plan_name,
      plan_price: this.plan_price,
      plan_type: 'rent',
      plan_id: this.plan_id,
      payment_type: this.payment_type,
      expected_rent: this.expected_rent,
      property_name: this.product_data.build_name,
      property_id: this.product_data.id,
      gst_amount: this.gst_amount,
      maintenance_charge: this.maintenance_charge,
      security_deposit: this.security_dep_amount,
      total_amount: this.total_amount_hs + this.total_amount_owner,
      property_uid: this.product_data.product_uid,
      payment_mode: this.mode_payment
    }
    const modalLoginDialog = this.matDialog.open(LoginModalComponent, dialogConfig);

  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "250px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      plan_name: this.plan_name,
      plan_price: this.plan_price,
      plan_type: 'rent',
      plan_id: this.plan_id,
      payment_type: this.payment_type,
      expected_rent: this.expected_rent,
      property_name: this.product_data.build_name,
      property_id: this.product_data.id,
      gst_amount: this.gst_amount,
      maintenance_charge: this.maintenance_charge,
      security_deposit: this.security_dep_amount,
      total_amount: this.total_amount_hs + this.total_amount_owner,
      property_uid: this.product_data.product_uid,
      payment_mode: this.mode_payment
    }
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);

  }

  setStep(index: number) {
    this.step = index;
  }

  plan_payment(plan_name, plan_id, payment_type, plan_type, expected_rent, price_duration) {
    console.log(plan_name, plan_id, payment_type, plan_type, expected_rent, price_duration);
    this.plan_name = plan_name;
    this.plan_price = expected_rent / (30 / price_duration);
    this.plan_type = 'rent';
    this.plan_id = plan_id;
    this.payment_type = payment_type;
    this.expected_rent = expected_rent;
    this.property_name = this.product_data.build_name;
    this.property_id = this.product_data.id;
    this.gst_amount = (18 * this.plan_price) / 100;
    this.maintenance_charge = this.product_data.maintenance_charge;
    this.security_deposit = this.product_data.security_deposit;
    this.security_dep_amount = this.expected_rent * this.security_deposit;
    this.total_amount_hs = this.plan_price + this.gst_amount;
    this.maintenance_charge = this.product_data.maintenance_charge;
    console.log(this.maintenance_charge);
    if (this.maintenance_charge) {
      this.total_amount_owner = Number(this.expected_rent) + Number(this.security_dep_amount) + Number(this.maintenance_charge);
    }
    else {
      this.total_amount_owner = Number(this.expected_rent) + Number(this.security_dep_amount);
    }
    this.total_amount = this.total_amount_hs + this.total_amount_owner;
    this.step++;
  }

  generateInvoice(orderID) {
    var formData: any = new FormData();
    formData.append('plan_name', this.plan_name);
    formData.append('plan_price', this.plan_price);
    formData.append('plan_type', 'rent');
    formData.append('plan_id', this.plan_id);
    formData.append('payment_type', this.payment_type);
    formData.append('expected_rent', this.expected_rent);
    formData.append('property_name', this.product_data.build_name);
    formData.append('property_id', this.product_data.id);
    formData.append('gst_amount', this.gst_amount);
    formData.append('maintenance_charge', this.maintenance_charge);
    formData.append('security_deposit', this.security_dep_amount);
    formData.append('total_amount', this.total_amount_hs + this.total_amount_owner);
    formData.append('property_uid', this.product_data.product_uid);
    formData.append('payment_mode', this.mode_payment);

    let val = this.tokenStorage.getUser();
    if (val != null) {
      console.log(val);
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
      this.userService.getUserPhoneDetails().subscribe(
        data => {
          if (data !== 1) {
            console.log("Mobile number not verified");
            this.returnUrl = this.router.url;
            this.tokenStorage.saveReturnURL(this.returnUrl);
            this.openModal();
          }
          else {
            console.log("Mobile number verified");
            formData.append('user_id', this.user_id);
            formData.append('user_email', this.userEmail);
            this.planService.postSelectedRentPlan(formData).subscribe(
              res => {
                console.log(res);
                this.planService.generateRentInvoice(res.data.order_id).subscribe(
                  res => {
                    console.log(res);
                    this.router.navigate(['/invoice'], { queryParams: { 'invoice_no': res.data } });
                  },
                  err => {
                    console.log(err);
                  }
                );
              },
              err => {
                console.log(err);
              }
            );
          }
        },
        err => {
          console.log(err);
        }

      );
    }
    else {
      console.log("Not logged in: " + val);
      console.log(this.router.url);
      this.openLoginModal();
    }
    
  }

}
