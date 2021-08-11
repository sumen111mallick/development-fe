import { Component, OnInit, ElementRef } from '@angular/core';
import { ChartType, ChartOptions, Chart } from 'chart.js';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import  ChartDataLabels  from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-emi-calculator',
  templateUrl: './emi-calculator.component.html',
  styleUrls: ['./emi-calculator.component.css']
})
export class EmiCalculatorComponent implements OnInit {

  PieChart: any = [];
  hide: boolean = true;
  interest_perc_fixed: any = '';
  principal_perc_fixed: any = '';
  p: any = '';
  monthly_emi_fixed: any = '';
  final_monthly_emi_fixed: any = '';
  total_payment: any = '';
  final_total_payment: any = '';
  selTenure = '';
  myTag: any;
  n: any = '';
  tenType: any;
  minNum: number;
  maxNum: number;
  amount_loan: any = '';
  total_interest: any = '';

  emiForm = new FormGroup({
    loan_amount: new FormControl('1000000', [Validators.required, Validators.minLength(6)]),
    loan_tenure: new FormControl('5', [Validators.required, Validators.max(30), Validators.min(2)]),
    loan_roi: new FormControl('9.5', [Validators.required, Validators.pattern(/^(\d{0,2}(\.\d{0,2})?)$/)]),
  });

  constructor(private el: ElementRef) { }

  get f() {
    return this.emiForm.controls;
  }

  /*pieChartOptions: any = {
    responsive: true,
    legend: {
      position: 'bottom',
      labels: {
        fontColor: "#000080",
        generateLabels: {
          text: "Hello"
        }
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        }
      }
    }
  }; */

  /* pieChartLabels = [['Principal Amount'], ['Interest Amount']];
   //pieChartData: number[] = [this.principal_perc_fixed,this.interest_perc_fixed];
   pieChartData = [];
   pieChartType: ChartType = 'pie';
   pieChartLegend = true; */


  /* pieChartColor: any = [
     {
       backgroundColor: ['rgba(76, 154, 112, 1)',
         'rgba(255,165,0,0.9)'
       ]
     }
   ] */

  ngOnInit(): void {
    this.maxNum = 30;
    this.minNum = 2;
    this.tenType = this.el.nativeElement.querySelector(".tenYears").innerHTML;
    console.log(this.tenType);
    this.calculateEmi(this.tenType);

    this.PieChart = new Chart('pieChart', {
      type: 'pie',
      plugins: [ChartDataLabels],
      data: {
        labels: [['Principal Amount'], ['Interest Amount']],
        datasets: [{
          label: 'EMI Calculator',
          data: [this.principal_perc_fixed, this.interest_perc_fixed],
          backgroundColor: ['rgba(251, 136, 85, 1)',
            'rgba(146, 208, 96, 1)'
          ],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            color: "#fff",
            labels: {
              title: {
                font: {
                  weight: "bold"
                }
              }
            }
          }
        },
        title: {
          display: true,
          text: "EMI Calculator"
        },
        legend: {
          position: 'top',
        },
        tooltips: {

          callbacks: {
            title: function () {
              return '';
            },
            label: function (tooltipItem, data) {
              return '';
            },
            afterLabel: function (tooltipItem, data) {
              var dataset = data['datasets'][0];
              var datalabels = data['labels'];
              console.log(data['labels']);
              console.log(datalabels[tooltipItem['index']]);
              var percent = dataset['data'][tooltipItem['index']];
              return datalabels[tooltipItem['index']] + ": " + percent + " %";

            } 
          }
        }


      }
    })
    console.warn(this.emiForm.value);

  }

  commaSeperated(e) {
    var t = (e = e ? e.toString() : "").substring(e.length - 3)
      , n = e.substring(0, e.length - 3);
    return "" !== n && (t = "," + t),
      n.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + t
  }

  calculateEmi(tenureType) {
    this.amount_loan = this.emiForm.value.loan_amount;
    let tenure_loan = this.emiForm.value.loan_tenure;
    let roi_loan = this.emiForm.value.loan_roi;

    let p = this.amount_loan.replace(/,/g, '');
    let r = roi_loan / 100 / 12;
    console.log(tenureType);
    if (tenureType == "Years") {
      this.n = tenure_loan * 12;
      //this.maxNum = 30;
      //this.minNum = 2;
      console.log("Tenure is: " + this.n);
    }
    else if (tenureType == "Months") {
      this.n = tenure_loan;
      //this.maxNum = this.maxNum * 12;
      //this.minNum = this.minNum * 12;

      console.log("Tenure is: " + this.n);
    }


    let x = Math.pow(1 + r, this.n);
    let monthly_emi = (p * x * r) / (x - 1);
    this.monthly_emi_fixed = monthly_emi.toFixed();
    this.final_monthly_emi_fixed = this.commaSeperated(this.monthly_emi_fixed);
    this.total_interest = (monthly_emi * this.n - p).toFixed();
    this.total_payment = (monthly_emi * this.n).toFixed();
    this.final_total_payment = this.commaSeperated(this.total_payment);
    console.log(this.final_total_payment);
    let interest_perc: any = (this.total_interest * 100) / this.total_payment;
    let principal_perc: any = (p * 100) / this.total_payment;
    this.interest_perc_fixed = interest_perc.toFixed(2);
    this.principal_perc_fixed = principal_perc.toFixed(2);

    console.log(monthly_emi.toFixed());
    console.log(interest_perc.toFixed(2));
    console.log(principal_perc.toFixed(2));

    console.log(this.PieChart.data);
    //this.PieChart.data.datasets[0].data[0] = this.principal_perc_fixed;
    //this.PieChart.data.datasets[0].data[1] = this.interest_perc_fixed;

    //this.pieChartData[0] = this.principal_perc_fixed;
    //this.pieChartData[1] = this.interest_perc_fixed;

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

  // Only Numbers with Decimals
  keyPressNumbersDecimal(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  showOptions() {
    console.log(this);
    let myTag = this.el.nativeElement.querySelector(".tenDropdown");
    console.log(myTag);
    myTag.hide = !myTag.hide;
    if (myTag.classList.contains('hide')) {
      myTag.classList.remove('hide');
    }
    else {
      myTag.classList.add('hide');
    }

  }

  getValue(event) {
    console.log(event.path[0].innerHTML);
    this.selTenure = event.path[0].innerHTML;
    this.myTag = this.el.nativeElement.querySelector(".tenYears");
    console.log(this.myTag);
    this.myTag.innerHTML = event.path[0].innerHTML;
    if (this.selTenure == "Years") {
      //this.maxNum = 30;
      //this.minNum = 2;
      this.minNum = 2;
      this.maxNum = 30;
      console.log(this.maxNum);
      console.log(this.minNum);
    }
    else if (this.selTenure == "Months") {
      //this.maxNum = this.maxNum * 12;      
      //this.minNum = this.minNum * 12;
      this.minNum = 24;
      this.maxNum = 360;
      console.log(this.maxNum);
      console.log(this.minNum);
    }
    //this.emiForm.get('loan_tenure').setValidators([Validators.min(this.minNum), Validators.max(this.maxNum)]);
    this.emiForm.controls["loan_tenure"].setValidators([Validators.min(this.minNum), Validators.max(this.maxNum), Validators.required]);
    this.emiForm.controls["loan_tenure"].updateValueAndValidity();
    console.log(this.emiForm);
    this.calculateEmi(this.selTenure);
    this.PieChart.data.datasets[0].data[0] = this.principal_perc_fixed;
    this.PieChart.data.datasets[0].data[1] = this.interest_perc_fixed;
    this.PieChart.update({
      duration: 800,
      easing: 'easeOutBounce'
    });
  }

  loanDetailsChange(event) {
    console.log(event);
    this.myTag = this.el.nativeElement.querySelector(".tenYears").innerHTML;
    console.log(this.myTag);
    console.log(this.commaSeperated(this.emiForm.controls['loan_amount'].value));
    this.emiForm.controls['loan_amount'].patchValue = this.commaSeperated(this.emiForm.controls['loan_amount'].value);
    this.emiForm.controls['loan_amount'].updateValueAndValidity();
    //this.maxNum = 30;
    //this.minNum = 2;
    console.log(this.emiForm.controls);
    if (this.emiForm.get('loan_amount').valid && this.emiForm.get('loan_roi').valid && this.emiForm.get('loan_tenure').valid) {
      this.calculateEmi(this.myTag);
      this.PieChart.data.datasets[0].data[0] = this.principal_perc_fixed;
      this.PieChart.data.datasets[0].data[1] = this.interest_perc_fixed;
      this.PieChart.update({
        duration: 800,
        easing: 'easeOutBounce'
      });
    }

  }

}
