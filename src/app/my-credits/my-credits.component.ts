import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './../_services/token-storage.service';
import { Router } from '@angular/router';
import { PlansService } from './../_services/plans.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PropertyDetailsModalComponent } from './../property-details-modal/property-details-modal.component';

@Component({
  selector: 'app-my-credits',
  templateUrl: './my-credits.component.html',
  styleUrls: ['./my-credits.component.css']
})
export class MyCreditsComponent implements OnInit {

  public userEmail: string[] = null;
  private usertype: any;
  public userDetails: any;
  public response: any;
  public showLoadingIndicator: boolean =false;
  public order_response: any;

  constructor(private tokenStorage: TokenStorageService,
    private router: Router,
    private planService: PlansService,
    private dialog: MatDialog,
    public matDialog: MatDialog) { }

  ngOnInit(): void {

    let val = this.tokenStorage.getUser();
    if (val != null) {
      if (this.tokenStorage.getUser().misc) {
        this.userEmail = this.tokenStorage.getUser().misc.email;
        this.usertype = this.tokenStorage.getUser().usertype;
      }
      else {
        this.userDetails = JSON.parse(this.tokenStorage.getUser());
        //console.log(this.userDetails);
        this.userEmail = this.userDetails.email;
        this.usertype = this.userDetails.usertype;
      }
      console.log(this.userEmail);
      this.planService.getAllUserInvoices(this.userEmail).subscribe(
        res => {
          this.response = res;
          console.log(this.response);
        },
        err => {  
          console.log(err);
        }
      );
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  getRentInvoices() {
    return this.response.filter((item) => item.plan_type == 'rent');
  }

  getLetOutInvoices() {
    return this.response.filter((item) => item.plan_type == 'let_out');
  }

  viewInvoice(invoice_no) {
    this.router.navigate(['/invoice'], { queryParams: { 'invoice_no': invoice_no } });
  }

  viewProperty(order_id) {
    console.log(order_id);
    this.planService.getRentOrderDetails(order_id).subscribe(
      result => {
        console.log(result);
        this.order_response = result[0];
        this.openModal(this.order_response);
      },
      err => {
        console.log(err);
      }
    );
  }

  openModal(order_response) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    //dialogConfig.disableClose = true;
    //dialogConfig.id = "modal-component";
    //dialogConfig.height = "250px";
    //dialogConfig.width = "600px";
    //const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    const modalDialog = this.matDialog.open(PropertyDetailsModalComponent, {
      id: 'property-modal-component',
      disableClose: false,
      height: '80%',
      data: {
        order_id: order_response.order_id,
        property_name: order_response.property_name,
        invoice_no: order_response.invoice_no,
        payment_status: order_response.payment_status,
        payment_mode: order_response.payment_mode,
        amount_paid: order_response.amount_paid,
        plan_name: order_response.plan_name,
        plan_type: order_response.plan_type,
        plan_price: order_response.plan_price,
        gst_amount: order_response.gst_amount,
        security_deposit: order_response.security_deposit,
        maintenance_charge: order_response.maintenance_charge,
        expected_rent: order_response.expected_rent,
        total_amount: order_response.total_amount,
        source: 'mycredits'
      }
    });
  }

}
