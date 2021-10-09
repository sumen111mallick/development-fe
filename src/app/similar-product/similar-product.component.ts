import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConstants } from './../global-constants';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-similar-product',
  templateUrl: './similar-product.component.html',
  styleUrls: ['./similar-product.component.css']
})
export class SimilarProductComponent implements OnInit {
  public showLoadingIndicator:boolean=false;
  public similar_property:any;
  public cityValue:any;
  public isLoggedIn:boolean=false;
  public id:number=0;
  public Product_id:number=0;
  public ftpstring: string = GlobalConstants.ftpURL;
  public sitestring: string = GlobalConstants.siteURL;
  public e:any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route:ActivatedRoute,
    private toastr: ToastrService
  ) {  this.route.queryParams.subscribe((params) => {
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
          this.cityValue=data["product"]["0"]["city"];
          this.similarproperty(this.cityValue);
          this.showLoadingIndicator = false;         
        },
          err => {
            //console.log(err);
          }
        );
    }else{
      this.authService.product_see(id).subscribe(
      data => {
        this.cityValue=data["product"]["0"]["city"];
        this.similarproperty(this.cityValue);
        this.showLoadingIndicator = false;
      },
        err => {
          //console.log(err);
          this.showLoadingIndicator = false;
        }
      );
    }
  }
  similarproperty(cityValue: any){
    if(this.tokenStorage.getToken()){
      this.showLoadingIndicator = true;
      this.authService.login_similarproperty(this.cityValue).subscribe(
      data => {
        this.similar_property = data["product"];
        //console.log(this.similar_property);
        this.wishlist_info();
        this.pro_comp_refresh();
        this.showLoadingIndicator = false;
      },
        err => {
         // console.log(err);
        }
      );
    }else{
      this.showLoadingIndicator = true;
      this.authService.product_similarproperty(this.cityValue).subscribe(
      data => {
        this.similar_property = data["product"];
        //console.log(this.similar_property);
        this.showLoadingIndicator = false;
      },
        err => {
          //console.log(err);
          this.showLoadingIndicator = false;
        }
      );

    }
  }
  // pricre convert functionalty
Price_convert(num: number) {
  if (num >= 1000000000) {
     return (num / 1000000000).toFixed(2).replace(/\.0$/, '') + 'G';
  }
  if (num >= 10000000) {
    return (num / 10000000).toFixed(2).replace(/\.0$/, '') + 'Crore';
  }
  if (num >= 100000) {
    return (num / 100000).toFixed(2).replace(/\.0$/, '') + 'Lac';
  }
  if (num >= 1000) {
    this.e=num;
    var t = (this.e = this.e ? this.e.toString() : "").substring(this.e.length - 3)
    , n = this.e.substring(0, this.e.length - 3);
    return "" !== n && (t = "," + t),
    n.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + t
  }
  return num;
}
// product comaprision functinalty 
product_comp(id:number){
  //console.log(id);
  // Login check
  if(this.tokenStorage.getUser() != null){
    this.isLoggedIn = true;
    //console.log(this.isLoggedIn);
    // this.maintenance = true;
    // this.parking = false;     
      this.authService.Crete_product_comp(id).pipe().subscribe(
        (data: any) =>{
          //console.log(data);
          this.similarproperty(this.cityValue);
          this.single_property_data(this.id);
          //console.log(data.data.length);
          if(data.data.length>4){
            this.toastr.info('Compare Bucket is Full...!!!', 'Property', {
              timeOut: 3000,
            });
          }else{
            this.toastr.success('Added To compare Successfully', 'Property', {
              timeOut: 3000,
            });
          }
          this.showLoadingIndicator = false;
        },
        err => {
          //console.log(err.error);
          this.showLoadingIndicator = false;
        }
      );
  }
  else{
    this.redirect_to_home();
  }
}
   wishlist_added(data: any){
    // Login check
    if(this.tokenStorage.getUser() != null){
      if (this.tokenStorage.getToken()){
        // this.isLoggedIn = true;      
        this.authService.Wishlist(data).pipe().subscribe(
          (result: any) =>{
            //console.log(result);
            this.similarproperty(this.cityValue);
            this.single_property_data(this.id);
            this.showLoadingIndicator = false;
          },
          err => {
            //console.log(err.error);
            this.showLoadingIndicator = false;
          }
        );
      }
      else{
        this.isLoggedIn = false ;
      }
    }
    else{
      this.redirect_to_home();
    }       
  }
  
  Wishlist_remove(data: any){
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true;
       this.authService.WishlistRemove(data).pipe().subscribe(
        (result: any) =>{
         // console.log(result);
          this.similarproperty(this.cityValue);
          this.single_property_data(this.id);
          this.showLoadingIndicator = false;
        },
        err => {
          //console.log(err.error);
          this.showLoadingIndicator = false;
        }
      );
    }
    else{
      this.redirect_to_home();
    }
    
  }
    // topbar searching functionalty
    wishlist_info(){
      this.userService.emit<string>('true');
   } 
   // topbar proeprty comparion functionalty
  pro_comp_refresh(){
    this.userService.pro_comp_emit<string>('true');
  } 
  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
  }
  redirect_to_home_page(): void {
    window.location.href=GlobalConstants.siteURL
  }
  
   // carosule image
   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      },
      1050: {
        items: 1
      }
    },
    nav: true
  }

}

