import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { PlansService } from '../_services/plans.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-property-credit-modal',
  templateUrl: './property-credit-modal.component.html',
  styleUrls: ['./property-credit-modal.component.css']
})
export class PropertyCreditModalComponent implements OnInit {

  public response: any;
  public letout_response: any;
  public letout_feat_res: any;
  public myArray_lo: any = [];
  public showLoadingIndicator: boolean = false;

  public userEmail: string[] = null;
  private usertype: any;
  public userDetails: any;
  public user_id: any;
  public plan_price: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private router: Router,
  private dialogRef: MatDialogRef<PropertyCreditModalComponent>,
  private plansService: PlansService,
  private userService: UserService,
  private tokenStorage: TokenStorageService,
  public matDialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.data);
    this.response = this.data;

    this.plansService.getLetOutPlans().subscribe(
      res => {
        this.letout_response = res;
        console.log(this.letout_response);
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
          //this.showLoadingIndicator = false;
        }
        console.log(this.letout_feat_res);
      },
      err => {
        console.log(err);
        //this.showLoadingIndicator = false;
      }
    );
  }

  apply_plan(invoice_no) {
    console.log("Plan Applied");
    this.dialogRef.close();
    this.router.navigate(['plan-apply'], { queryParams: { 'invoice_no': invoice_no, 'product_id': this.response.product_id } });
  }

  plan_payment(plan_name, plan_id, payment_type, plan_type, expected_rent, price_duration) {
    this.showLoadingIndicator = true;
    
      this.userService.getUserPhoneDetails().subscribe(
        data => {
          //console.log(data);
          if (data !== 1) {
            console.log("Mobile number not verified");
            this.showLoadingIndicator = false;
            this.openModal();
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
                this.dialogRef.close();
                this.router.navigate(['/payment-summary'], { queryParams: { 'orderID': res.data.order_id } });
              },
              err => {

              }
            );
            
          }
        }
      );
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "250px";
    dialogConfig.width = "600px";
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

}
