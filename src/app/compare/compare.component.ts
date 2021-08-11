import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Router } from '@angular/router';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  sitestring:string = GlobalConstants.siteURL;
  prod_id1: any;
  prod_id2: any;

  product_data1: [];
  user_data1: [];
  product_data2: [];
  user_data2: [];
  product_data3: [];
  user_data3: [];
  ftpstring: string = GlobalConstants.ftpURL;


  constructor(
    private router: Router,
    private idService: TokenStorageService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    console.log(this.idService.getCdata())
    console.log(this.idService.getProdId())

    {this.authService.product_see(this.idService.getCdata()).subscribe(

      data => {
        this.user_data1 = data["user_data"];
        this.product_data1 = data["product"];
        console.log(this.product_data1);
        console.log(this.user_data1);

      },
        err => {
          console.log(err);
        }
      );
    }
    {this.authService.product_see(this.idService.getProdId()).subscribe(

      data => {
        this.user_data2 = data["user_data"];
        this.product_data2 = data["product"];
        console.log(this.product_data2);
        console.log(this.user_data2);

      },
        err => {
          console.log(err);
        }
      );
    }
    {this.authService.product_see(this.idService.getProd2Id()).subscribe(

      data => {
        this.user_data3 = data["user_data"];
        this.product_data3 = data["product"];
        console.log(this.product_data3);
        console.log(this.user_data3);

      },
        err => {
          console.log(err);
        }
      );
    }
  }

  onShare1(){
    alert("Your Shareable Link is \n" + this.sitestring + this.router.url + "?id=" + this.prod_id1);
  }
  onShare2(){
    alert("Your Shareable Link is \n" + this.sitestring + this.router.url + "?id=" + this.prod_id2);
  }



}
