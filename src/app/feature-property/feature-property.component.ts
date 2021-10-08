import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobalConstants } from './../global-constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feature-property',
  templateUrl: './feature-property.component.html',
  styleUrls: ['./feature-property.component.css']
})
export class FeaturePropertyComponent implements OnInit {
  
  public showLoadingIndicator: boolean =false;
  public isLoggedIn:boolean=false;
  public product_length:number=0;
  public content:any;
  public number:any;
  e: any={};
  ftpstring = GlobalConstants.ftpURL;

  constructor(
    // private tokenService: TokenStorageService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
   this.home_call();  
  }
  home_call():void{
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;  
      this.showLoadingIndicator = true;
      this.authService.getproductWishlist().pipe().subscribe(
        (data: any) => {  
          this.content = data.data;
          this.number = data.data;
          this.product_length = data.data.length;
          // console.log(this.number);
          // console.log(this.number.length);
          this.showLoadingIndicator = false;
          this.wishlist_info();
          this.pro_comp_refresh();
        },
        err => {
          //this.content = JSON.parse(err.error).message;
          this.content = err.error.message;
          this.showLoadingIndicator = false;
        }
      );   
    }else{
      this.showLoadingIndicator = true;
      this.userService.getproductlistingfeatured().pipe().subscribe(
        (data: any) => {
          this.content = data.data;
          this.number = data.data;
          this.product_length= data.data.length;
          this.showLoadingIndicator = false;
          //console.log(this.number);        
        },
        err => {
          //this.content = JSON.parse(err.error).message;
          this.content = err.error.message;
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

wishlist_added(data: any){
  // Login check
  if (this.tokenStorage.getToken()){
    this.isLoggedIn = true;      
    this.authService.Wishlist(data).pipe().subscribe(
      (result: any) =>{
        //console.log(result);
        this.home_call();
      },
      err => {
        //console.log(err.error);
      }
    );

  }
  else{
    this.isLoggedIn = false ;
    this.redirect_to_home();
  }
}
Wishlist_remove(data: any){
  if(this.tokenStorage.getUser() != null){
    this.isLoggedIn = true;
     this.authService.WishlistRemove(data).pipe().subscribe(
      (result: any) =>{
        //console.log(result);
        this.home_call();
      },
      err => {
        //console.log(err.error);
      }
    );
  }
  else{
    this.redirect_to_home();
  }
  
}
// product comaprision functinalty 
product_comp(id:number){
  //console.log(id);
  // Login check
  this.showLoadingIndicator = true;
  if(this.tokenStorage.getUser() != null){
    this.isLoggedIn = true
    //console.log(this.isLoggedIn);     
      this.authService.Crete_product_comp(id).pipe().subscribe(
        (data: any) =>{
          //console.log(data);
          this.showLoadingIndicator = false;
          this.home_call();
          //console.log(data.data.length);
          if(data.data.length>4){
            this.toastr.info('Compare are the Full...!!!', 'Property', {
              timeOut: 3000,
            });
          }else{
            this.toastr.success('Added To compare Successfully', 'Property', {
              timeOut: 3000,
            });
          }
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


redirect_to_home(): void {
  window.location.href=GlobalConstants.siteURL="login"
  }

  // wishlist refreh functionalty 
wishlist_info(){
  this.userService.emit<string>('true');
 } 
  // topbar proeprty comparion functionalty
  pro_comp_refresh(){
    this.userService.pro_comp_emit<string>('true');
  }
  // carosule image
customOptions: OwlOptions = {
  loop:true,
  dots:true,
  // autoplay:false,
  // autoplayTimeout:8000,
  // items:3,
  // autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['<span class="outer_slider"><i class="fas fa-arrow-left"></i></span>', '<span class="outer_slider"><i class="fas fa-arrow-right"></i></span>'],
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
      items: 3
    },
    1050: {
      items: 3
    },
    1250: {
      items: 3
    }
  },
  nav:true
}  
 // carosule image
 customOptions_inner: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  autoplay:false,
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
