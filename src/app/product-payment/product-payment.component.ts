import { Component, OnInit } from '@angular/core';
import { PlansService } from './../_services/plans.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { UserService } from './../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-product-payment',
  templateUrl: './product-payment.component.html',
  styleUrls: ['./product-payment.component.css']
})
export class ProductPaymentComponent implements OnInit {

  public response: any;
  public rent_feat_res: any;
  public myArray: any = [];
  public product_id: any;
  public product_data: any;
  public expected_rent: any;
  public showLoadingIndicator: boolean = false;
  public returnUrl: string;
  public plan_price: number;

  public userEmail: string[] = null;
  private usertype: any;
  public userDetails: any;
  public user_id: any;


  constructor(private route: ActivatedRoute,
    private plansService: PlansService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router,
    public matDialog: MatDialog,
    private authService: AuthService,
    private productService: ProductService) { }

  ngOnInit(): void {

    this.product_id = this.route.snapshot.queryParams['productID'];
    this.productService.get_product_details(this.product_id).subscribe(
      prod_data => {
        this.product_data = prod_data[0];
        console.log(this.product_data);
        this.expected_rent = this.product_data.expected_rent;
      },
      err => {
        console.log(err);
      }
    );

    this.plansService.getRentPlans().subscribe(
      res => {
        this.response = res;
        console.log(this.response);
      },
      err => {

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
            formData.append('property_id', this.product_id);

            console.log(plan_name, plan_id, payment_type, plan_type, expected_rent, price_duration, this.plan_price);

            this.showLoadingIndicator = false;
            this.plansService.postSelectedRentPlan(formData).subscribe(
              res => {
                console.log(res);
                this.router.navigate(['/pro_payment_summary'], { queryParams: { 'orderID': res.data.order_id, 'productID': this.product_id } });
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
    //dialogConfig.disableClose = true;
    //dialogConfig.id = "modal-component";
    //dialogConfig.height = "250px";
    //dialogConfig.width = "600px";
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
    //dialogConfig.disableClose = true;
    //dialogConfig.id = "modal-login-component";
    //dialogConfig.height = "250px";
    //dialogConfig.width = "600px";
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
