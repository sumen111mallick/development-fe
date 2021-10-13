import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './../_services/token-storage.service';
import { Router } from '@angular/router';
import { PlansService } from './../_services/plans.service';

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

  constructor(private tokenStorage: TokenStorageService,
    private router: Router,
    private planService: PlansService) { }

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
      this.planService.getCreditDetails(this.userEmail).subscribe(
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

  viewInvoice(invoice_no) {
    this.router.navigate(['/invoice'], { queryParams: { 'invoice_no': invoice_no } });
  }

}
