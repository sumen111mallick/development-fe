import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { GlobalConstants } from './../global-constants';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-google-map',
  templateUrl: './product-google-map.component.html',
  styleUrls: ['./product-google-map.component.css']
})
export class ProductGoogleMapComponent implements OnInit {
  public showLoadingIndicator:boolean=false;
  public isLoggedIn:boolean=false;
  public latCus:any;
  public longCus:any;
  public Product_id:number=0;
  public id:number=0;
  public address:any;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route:ActivatedRoute,
    private authService: AuthService)
     {
      this.route.queryParams.subscribe((params) => {
        // console.log(params.id);
      this.id = params.id;
      this.Product_id=this.id;
      this.single_property_data(this.id);
      });
      }

  ngOnInit(): void {
  }
  
  single_property_data(id: any){
    this.showLoadingIndicator = true;
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true;
      //console.log(this.isLoggedIn);
      this.authService.product_login_see(id).subscribe(
        data => {
          // console.log(data);
          if(data.product.length== 0){
          this.redirect_to_home_page();
          } 
          this.address=data["product"]["0"]["address"];
          this.latCus=parseFloat(data["product"]["0"]["map_latitude"]);
          this.longCus=parseFloat(data["product"]["0"]["map_longitude"]);
          this.showLoadingIndicator = false;
  
          
        },
          err => {
            //console.log(err);
          }
        );
    }else{
      this.authService.product_see(id).subscribe(
      data => {
        // console.log(data);
        if(data.product.length== 0){
          this.redirect_to_home_page();
         } 
         this.address=data["product"]["0"]["address"];
         this.latCus=parseFloat(data["product"]["0"]["map_latitude"]);
         this.longCus=parseFloat(data["product"]["0"]["map_longitude"]);
         this.showLoadingIndicator = false;
        this.showLoadingIndicator = false;
      },
        err => {
          //console.log(err);
          this.showLoadingIndicator = false;
        }
      );
    }
  }
  redirect_to_home_page(): void {
    window.location.href=GlobalConstants.siteURL
  }


}
