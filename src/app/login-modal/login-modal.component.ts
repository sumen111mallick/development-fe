import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  public returnUrl: string;
  public response: any;
  public plan_price: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    public LogindialogRef: MatDialogRef<LoginModalComponent>) { }

  ngOnInit(): void {
    console.log(this.data);
    console.log(typeof(this.data));
    this.response = this.data;
  }

  actionFunction() {
    this.closeModal();
    //this.router.navigate(['login'], { queryParams: { 'redirect_url': this.router.url } });
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

    this.router.navigate(['login']);
    /*.then(() => {
      window.location.reload();
    });*/
  }

  closeModal() {
    this.LogindialogRef.close();
  }

}
