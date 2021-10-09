import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { GlobalConstants } from './../global-constants';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.css']
})
export class ProductSliderComponent implements OnInit {
  public showLoadingIndicator:boolean=false;
  public isLoggedIn:any;
  public product_images:any;
  public product_img_length:number=0;
  public imageObject:any=[];
  public ftpstring: string = GlobalConstants.ftpURL;
  public sitestring: string = GlobalConstants.siteURL;
  public Product_id:number=0;
  public id:number=0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route:ActivatedRoute,
    private tokenStorage: TokenStorageService
    ) {
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
          this.product_images = data["product"]["0"].product_img;
          this.product_img_length = data["product"]["0"].product_img.length;
          if(this.product_img_length>0){
          // console.log(this.product_img_length);
            for(let i=0;i<this.product_img_length; i++){
              this.imageObject.push({
                image:this.ftpstring+this.product_images[i]["image"],
                thumbImage:this.ftpstring+this.product_images[i]["image"],
                title: data["product"]["0"].build_name
            });
            }            
          }
          this.showLoadingIndicator = false;          
        },
          err => {
            //console.log(err);
          }
        );
    }else{
      this.authService.product_see(id).subscribe(
      data => {
         this.product_images = data["product"]["0"].product_img;
          this.product_img_length = data["product"]["0"].product_img.length;
          if(this.product_img_length>0){
            for(let i=0;i<this.product_img_length; i++){
              this.imageObject.push({
                image:this.ftpstring+this.product_images[i]["image"],
                thumbImage:this.ftpstring+this.product_images[i]["image"],
                title: data["product"]["0"].build_name
            });
            }            
          }
        this.showLoadingIndicator = false;
      },
        err => {
          this.showLoadingIndicator = false;
        }
      );
    }
  }
  
  onShare(){
    alert("Your Shareable Link is \n" + this.sitestring + this.router.url );
  }

}
