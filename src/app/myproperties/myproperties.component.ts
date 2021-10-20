import { UserService } from './../_services/user.service';
import { GlobalConstants } from './../global-constants';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { PlansService } from './../_services/plans.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PropertyCreditModalComponent } from './../property-credit-modal/property-credit-modal.component';
import { PropertyDetailsModalComponent } from './../property-details-modal/property-details-modal.component';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-myproperties',
  templateUrl: './myproperties.component.html',
  styleUrls: ['./myproperties.component.css']
})
export class MypropertiesComponent implements OnInit {

  public showLoadingIndicator: boolean = false;
  public content:any = [];
  public draft_pro_data: any = [];
  public solid_pro_data: any = [];
  public purchased_pro_data: any = [];
  ftpstring: string = GlobalConstants.ftpURL;
  usertype: any;
  page: number = 1;
  public p: number;
  public contentLenght: number = 0;
  public draft_Lenght: number = 0;
  public solid_Lenght: number = 0;
  public purchased_Lenght: number = 0;
  e: any;
  public userEmail: string[] = null;
  public userDetails: any;
  public response: any;
  public rented_properties: any;
  public dialog_step: number;

  constructor(
    private titleService: Title,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private planService: PlansService,
    private dialog: MatDialog,
    public matDialog: MatDialog,
  ) { }

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
    }
    else {
      this.router.navigate(['/login']);
    }
    this.titleService.setTitle('My Properties');
    this.usertype = this.tokenStorage.getUser().usertype;

    this.showLoadingIndicator = true;
    this.Myproperty();
    this.Draft_property();
    this.user_order_product();
    this.get_rented_properties();
  }
  Myproperty() {
    this.showLoadingIndicator = true;
    this.userService.getproperties().pipe().subscribe(
      (data: any) => {
        this.contentLenght = data.data.length;
        //console.log(this.contentLenght);
        this.content = data.data;
        this.showLoadingIndicator = false;
        // console.log(data.data);

      },
      err => {
        //console.log(err)
        this.showLoadingIndicator = false;
      }
    )
  }

  live_properties() {
    return this.content.filter((item) => item.order_status == '0');
  }

  onRent_properties() {
    return this.content.filter((item) => item.order_status == '1');
  }

  get_rented_properties() {
    this.planService.get_rent_properties(this.userEmail).subscribe(
      res => {
        console.log(res);
        this.rented_properties = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  user_order_product() {
    this.showLoadingIndicator = true;
    this.userService.user_order_product().pipe().subscribe(
      (data: any) => {
        console.log(data);
        this.solid_Lenght = data.sold.length;
        this.solid_pro_data = data.sold;

        // purchased property 
        this.purchased_Lenght = data.purchased.length;
        this.purchased_pro_data = data.purchased;
        this.showLoadingIndicator = false;

      },
      err => {
        //console.log(err)
      }
    )
  }

  // property_pursched(){
  //   this.showLoadingIndicator = true;
  //   this.userService.getproperties_pursched().pipe().subscribe(
  //     (data: any) => {

  //       this.purchased_Lenght=data.data.length;
  //       this.purchased_pro_data= data.data;
  //       this.showLoadingIndicator = false;

  //     },
  //     err => {
  //       //console.log(err)
  //     }
  //   )
  // }

  Draft_property() {
    this.showLoadingIndicator = true;
    this.userService.Draft_properties().pipe().subscribe(
      (data: any) => {
        this.draft_Lenght = data.data.length;
        // console.log(this.draft_Lenght);
        this.draft_pro_data = data.data;
        this.showLoadingIndicator = false;
        //console.log(data.data);

      },
      err => {
        //console.log(err)
        this.showLoadingIndicator = false;
      }
    )
  }
  del_func(id) {
    this.showLoadingIndicator = true;
    this.authService.property_delete(id).subscribe(
      data => {
        //console.log(data);
        this.Myproperty();
        this.showLoadingIndicator = false;
      },
      err => {
        //console.log(err)
        this.showLoadingIndicator = false;
      }
    );
  }

  redirect_to_home(): void {
    window.location.href = GlobalConstants.siteURL = "login"
  }
  prod_func(data) {
    this.tokenStorage.saveProdId(data);
    // this.myservice.setData(data);
    // this.router.navigate(["/productpage"])
  }
  property_details(id) {
    //console.log(id);
    this.router.navigate(["UdateProperty/", id]);
  }
  price_comma(value: number): void {
    this.e = value;
    var t = (this.e = this.e ? this.e.toString() : "").substring(this.e.length - 3)
      , n = this.e.substring(0, this.e.length - 3);
    return "" !== n && (t = "," + t),
      n.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + t
  }
  checkCredits(product_id, product_price) {
    this.showLoadingIndicator = true;
    this.planService.getUserInvoices(this.userEmail).subscribe(
      res => {
        this.response = res;
        console.log(this.response);
        if (this.response.length == 0) {
          this.dialog_step = 1;
        }
        else if (this.response.length > 0) {
          this.dialog_step = 0;
        }
        const dialogRef = this.dialog.open(PropertyCreditModalComponent, {
          data: {
            response: this.response,
            product_id: product_id,
            product_price: product_price,
            dialog_step: this.dialog_step
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
        this.showLoadingIndicator = false;
      },
      err => {
        console.log(err);
        this.showLoadingIndicator = false;
      }
    );

    /*this.planService.getCreditDetails(this.userEmail).subscribe(
      res => {
        this.response = res;
        console.log(this.response);
        const dialogRef = this.dialog.open(PropertyCreditModalComponent, {
          data: {
            response: this.response
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      },
      err => {
        console.log(err);
      }
    );*/
  }

  openModal(property) {
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
      data: {
        invoice_no: property.invoice_no,
        payment_mode: property.payment_mode,
        payment_status: property.payment_status,
        plan_name: property.plan_name,
        plan_price: property.plan_price,
        gst_amount: property.gst_amount,
        security_deposit: property.security_deposit,
        maintenance_charge: property.maintenance_charge,
        expected_rent: property.expected_rent,
        total_amount: property.total_amount,
        source: 'myproperties'
      }
    });
  }
}
