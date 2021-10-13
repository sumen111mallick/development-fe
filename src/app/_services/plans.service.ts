import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalConstants } from './../global-constants';
import { Observable, throwError } from 'rxjs';

const PLANS_API = GlobalConstants.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private http: HttpClient) { }

  getRentPlans(): Observable<any> {
    return this.http.get(PLANS_API + 'get_rent_plans', httpOptions);
  }

  getLetOutPlans(): Observable<any> {
    return this.http.get(PLANS_API + 'get_letout_plans', httpOptions);
  }

  getRentFeatures(): Observable<any> {
    return this.http.get(PLANS_API + 'get_rent_features', httpOptions);
  }

  getLetOutFeatures(): Observable<any> {
    return this.http.get(PLANS_API + 'get_letout_features', httpOptions);
  }

  postSelectedPlan(data): Observable<any> {
    return this.http.post(PLANS_API + 'auth/post_selected_plan', data);
  }

  getOrderDetails($orderID): Observable<any> {
    console.log($orderID);
    return this.http.get(PLANS_API + 'auth/get_order_details/' + $orderID);
  }

  getInvoiceDetails($invoiceID): Observable<any> {
    return this.http.get(PLANS_API + 'auth/get_invoice_details/' + $invoiceID);
  }

  getUserInvoices($emailID): Observable<any> {
    return this.http.get(PLANS_API + 'auth/get_user_invoices/' + $emailID);
  }

  proceedToPayment($data): Observable<any> {
    return this.http.get(PLANS_API + 'auth/plans_payment/' + $data);
  }

  generateInvoice($order): Observable<any> {
    return this.http.post(PLANS_API + 'auth/generate_invoice', { orderID: $order }, httpOptions);
  }

  getCreditDetails($email): Observable<any> {
    return this.http.get(PLANS_API + 'auth/get_credit_details/' + $email);
  }

  getTotalCredit($email): Observable<any> {
    return this.http.get(PLANS_API + 'auth/get_total_credit/' + $email);
  }

  getPropertyDetails($productID): Observable<any> {
    return this.http.get(PLANS_API + 'auth/get_property_details/' + $productID);
  }

  updatePropertyDetails($productID): Observable<any> {
    return this.http.get(PLANS_API + 'auth/update_property_details/' + $productID);
  }

  updateInvoiceDetails($invoiceID, $productID, $productPrice): Observable<any> {
    const params = new HttpParams()
      .set('invoice_no', $invoiceID)
      .set('product_id', $productID)
      .set('product_price', $productPrice)
    return this.http.get(PLANS_API + 'auth/update_invoice_details/', {params});
  }

}
