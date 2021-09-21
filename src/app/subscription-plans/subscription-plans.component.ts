import { Component, OnInit } from '@angular/core';
import { PlansService } from './../_services/plans.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';


interface PriceRange {
  range: string;
  value: number;
}

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css']
})
export class SubscriptionPlansComponent implements OnInit {

  public showLoadingIndicator: boolean =false;
  public response: any;
  public letout_response: any;
  public rent_feat_res: any;
  public letout_feat_res: any;
  public myArray: any = [];
  public myArray_lo: any = [];

  budgetForm = new FormGroup({
    budget_amount: new FormControl('5000', [Validators.required, Validators.max(50000), Validators.min(5000)])
  });

  expectedRentForm = new FormGroup({
    expected_rent_amount: new FormControl('5000', [Validators.required, Validators.max(50000), Validators.min(5000)])
  });

  constructor(private plansService: PlansService) { }

  get f() {
    return this.budgetForm.controls;
  }

  get g() {
    return this.expectedRentForm.controls;
  }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.plansService.getRentPlans().subscribe(
      res => {
        this.response = res;
        console.log(this.response);
        this.showLoadingIndicator = false;
      },
      err => {
        this.showLoadingIndicator = false;
      }
    );

    this.plansService.getLetOutPlans().subscribe(
      res => {
        this.letout_response = res;
        console.log(this.letout_response);
      },
      err => {
        console.log(err);
      }
    );

    this.plansService.getRentFeatures().subscribe(
      res => {
        this.rent_feat_res = res;
        for(let feat_res in this.rent_feat_res) {
          console.log(this.rent_feat_res[feat_res].feature_details);
          this.myArray = this.rent_feat_res[feat_res].feature_details.split(',');
          console.log(this.myArray);
          this.rent_feat_res[feat_res].feature_details = this.myArray;
        }
        console.log(this.rent_feat_res);
      },
      err => {
        console.log(err);
      }
    );

    this.plansService.getLetOutFeatures().subscribe(
      res => {
        this.letout_feat_res = res;
        for(let feat_res_lo in this.letout_feat_res) {
          console.log(this.letout_feat_res[feat_res_lo].feature_details);
          this.myArray_lo = this.letout_feat_res[feat_res_lo].feature_details.split(',');
          console.log(this.myArray_lo);
          this.letout_feat_res[feat_res_lo].feature_details = this.myArray_lo;
        }
        console.log(this.letout_feat_res);
      },
      err => {
        console.log(err);
      }
    );
  }

  value: number = 5000;
  options: Options = {
    floor: 5000,
    ceil: 50000,
    step: 500,
    animate: true,
    showSelectionBar: true,
    translate: (value: number, label): string => {
      return this.commaSeperated(value);
    }
  };

  expected_rent_value: number = 5000;
  exp_rent_options: Options = {
    floor: 5000,
    ceil: 50000,
    step: 500,
    animate: true,
    showSelectionBar: true,
    translate: (value: number, label): string => {
      return this.commaSeperated(value);
    }
  };

  commaSeperated(e) {
    var t = (e = e ? e.toString() : "").substring(e.length - 3)
      , n = e.substring(0, e.length - 3);
    return "" !== n && (t = "," + t),
      n.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + t
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
