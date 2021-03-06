import { Component, OnInit } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { Router, ActivatedRoute } from '@angular/router';
import { PlansService } from './../_services/plans.service';
import { GlobalConstants } from './../global-constants';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.css']
})
export class PaymentSummaryComponent implements OnInit {

  public order_id: any;
  public response: any;
  public price_amount: any;
  public gst_amount: any;
  public total_amount: any;
  public paytm_data: any;
  public content: any;
  public paytm_form_url: string = GlobalConstants.Paytm_formURL;
  public payment_type: any;
  public mode_payment: number = 1;
  public returnurl: any;
  public open_modal: any;

  constructor(private route: ActivatedRoute,
    private planService: PlansService,
    private router: Router) { }

  ngOnInit(): void {

    this.order_id = this.route.snapshot.queryParams['orderID'];
    //this.open_modal = this.route.snapshot.queryParams['modal'];
    console.log(this.order_id);

    this.planService.getOrderDetails(this.order_id).subscribe(
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
    );
  }

  proceedToPayment(orderID) {
    console.log(orderID);
    this.planService.proceedToPayment(orderID).subscribe(
      res => {
        console.log(res);
        if (res.status == 201) {
          this.paytm_data = res.data;
          this.createPaytmForm();
        }
        else {

        }
      },
      err => {
        this.content = err.error.message;
      }
    );
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

  generateInvoice(orderID) {
    this.planService.generateInvoice(orderID).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/invoice'], { queryParams: { 'invoice_no': res.data } });
      },
      err => {
        console.log(err);
      }
    );
  }

}
