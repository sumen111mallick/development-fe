import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlansService } from './../_services/plans.service';
import { Router } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  public invoice_id: any;
  public response: any;
  public gst_amount: any;
  public total_amount: any;
  public order_details: any;

  constructor(private route: ActivatedRoute,
    private planService: PlansService,
    private router: Router) { }

  ngOnInit(): void {

    this.invoice_id = this.route.snapshot.queryParams['invoice_no'];
    this.planService.getInvoiceDetails(this.invoice_id).subscribe(
      res => {
        console.log(res);
        this.response = res[0];
        this.gst_amount = (18 * this.response.plan_price) / 100;

        if (this.response.plan_type == 'let_out') {
          this.total_amount = this.response.plan_price + this.gst_amount;
        }

        else if (this.response.plan_type == 'rent') {
          this.planService.getRentOrderDetails(this.response.order_id).subscribe(
            res => {
              this.order_details = res[0];
              console.log(this.order_details);
              if(this.order_details.maintenance_charge) {
                this.total_amount = this.response.plan_price + this.gst_amount + this.order_details.expected_rent + this.order_details.security_deposit + this.order_details.maintenance_charge;
              }
              else {
                this.total_amount = this.response.plan_price + this.gst_amount + this.order_details.expected_rent + this.order_details.security_deposit;
              }
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

  navigate_plans() {
    this.router.navigate(['my-credits'])
  }

  generatePDF() {
    let docDefinition = {
      content: [
        {
          text: 'Invoice',
          style: 'header'
        },
        {
          style: 'tableExample',
          table: {
            body: [
              ['Invoice No: ', this.invoice_id],
              ['Order ID: ', this.response.order_id],
              ['Payment Status: ', this.response.payment_status],
              ['Plan Price: ', this.response.plan_price],
              ['User Email: ', this.response.user_email],
              ['Plan Name: ', this.response.plan_name]
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        }
      },
    };

    pdfMake.createPdf(docDefinition).open();
  }

}
