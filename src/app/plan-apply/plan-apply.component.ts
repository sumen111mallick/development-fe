import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlansService } from './../_services/plans.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plan-apply',
  templateUrl: './plan-apply.component.html',
  styleUrls: ['./plan-apply.component.css']
})
export class PlanApplyComponent implements OnInit {

  public invoice_id: any;
  public product_id: any;
  public response: any;
  public pro_response: any;
  public diff_amount: any;
  public success_property: boolean;
  public success_invoice: boolean;

  constructor(private route: ActivatedRoute,
    private planService: PlansService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.invoice_id = this.route.snapshot.queryParams['invoice_no'];
    this.product_id = this.route.snapshot.queryParams['product_id'];
    this.planService.getInvoiceDetails(this.invoice_id).subscribe(
      res => {
        console.log(res);
        this.response = res[0];
      },
      err => {
        console.log(err);
      }
    );

    this.planService.getPropertyDetails(this.product_id).subscribe(
      res => {
        console.log(res);
        this.pro_response = res[0];
      },
      err => {
        console.log(err);
      }
    );
  }

  property_live($property_price) {
    this.planService.updatePropertyDetails(this.product_id).subscribe(
      res => {
        console.log(res);
        this.success_property = true;
      },
      err => {
        console.log(err);
      }
    );

    this.planService.updateInvoiceDetails(this.invoice_id, this.product_id, $property_price).subscribe(
      res => {
        console.log(res);
        this.success_invoice = true;
      },
      err => {
        console.log(err);
      }
    );
    console.log(this.success_property);
    console.log(this.success_invoice);

    this.toastr.info("CONGRATS!!! Your property is now Live");
    this.router.navigate(['productlisting']);
  }

}
