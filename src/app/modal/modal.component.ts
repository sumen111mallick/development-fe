import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public response: any;
  public returnUrl: string;

  public plan_price: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit(): void {
    console.log(this.data);
    console.log(typeof(this.data));
    this.response = this.data;
  }

  actionFunction() {
    this.returnUrl = this.router.url;
    console.log(this.returnUrl);
    if (this.returnUrl == '/plans') {
      this.plan_price = this.response.expected_rent / (30 / this.response.price_duration);
      this.response.plan_price = this.plan_price;
      console.log(this.response);
      console.log(typeof(this.response));
      console.log(this.response.plan_name, this.response.plan_id, this.response.payment_type, this.response.plan_type, this.response.expected_rent, this.response.price_duration, this.plan_price);      

      this.tokenStorage.saveReturnURL(this.returnUrl);
      this.tokenStorage.savePlansData(JSON.stringify(this.response));
    }
    else if(this.returnUrl.includes('pro_payment_summary')) {
      this.tokenStorage.saveReturnURL(this.returnUrl);
      this.tokenStorage.savePlansData(JSON.stringify(this.response));
    }
    this.router.navigate(['verify-details']);
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
