import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserLogsService } from './../_services/user-logs.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  [x: string]: any;
  wishlist_length=0;
  
  form: any = {};
  ared: any = {};
  isLoggedIn = false;
  isFormSubmitted = false;
  errorMessage = '';
  roles: string[] = [];
  content: any = {};
  maintenance: boolean = true;
  parking: boolean = false;
  ftpstring = GlobalConstants.ftpURL;
  e: any={};  
  showLoadingIndicator = false;
  public property_name:any;
  public property_type:any;
  public property_price:any;
  public property_uid:any;
  property_data: any = [];
  pro_id:any=null;
  type:any;
  device_info:any;
  browser_info:any;
  url_info:string;
  url: any;
  input_info:any=null;
  ip_address:any; 
  ipAddress:string;		
  userEmail:any;
  user_cart:any;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private idservice: TokenStorageService,
    private userService: UserService,
    private toastr: ToastrService,
    private userlogs: UserLogsService
    ) {
        if (this.tokenStorage.getToken() == null){
      
          this.redirect_to_home();    
        }
     }

  
    ngOnInit(): void {
      this.titleService.setTitle('Create Listing');
      this.url_info  = this.userlogs.geturl();      
      this.device_info  = this.userlogs.getDeviceInfo();
      this.browser_info = this.userlogs.getbrowserInfo();
      this.ip_address   = this.userlogs.getIpAddress();
      // Login check
      if (this.tokenStorage.getToken() != null){
        this.content = this.tokenStorage.getUser().id;
        this.maintenance = true;
        this.parking = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().username;
        this.getwishlist();
      }
      else{
        this.isLoggedIn = false ;
        this.redirect_to_home();
      }
      
    this.property_data = new Array<string>();
    }
      
// product comaprision functinalty 

  
// product comaprision functinalty 
product_comp(id:number){
  //console.log(id);
  // Login check
  if(this.tokenStorage.getUser() != null){
    this.isLoggedIn = true;
    //console.log(this.isLoggedIn);
    this.maintenance = true;
    this.parking = false;     
      this.authService.Crete_product_comp(id).pipe().subscribe(
        (data: any) => {
          //console.log(data);
          this.getwishlist();
          if(data.data.length>4){
            this.toastr.info('Compare Bucket is Full...!!!', 'Property', {
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
        }
      );
    }
    else {
      this.redirect_to_home();
    }
  }
  getwishlist(): void {
    this.showLoadingIndicator = true;
    this.userService.getwishlistdata().pipe().subscribe(
      (wishlistdata: any) => {
        this.wishlistcontent = wishlistdata.data;
        this.wishlistresult = this.wishlistcontent;
        this.wishlist_length = this.wishlistcontent.length;
        // console.log(this.wishlistresult);
        // console.log(this.wishlist_length);

        
        // user logs funtionalty
        if(this.wishlist_length>0){
          // loop start
          for(let i=0; i<this.wishlist_length; i++){
            if(this.wishlistresult[i].productdetails != null){
              // inner condition  check 
              if(this.wishlistresult[i].productdetails.expected_pricing != null){
                this.property_name=this.wishlistresult[i].productdetails.build_name;
                this.property_price=this.wishlistresult[i].productdetails.expected_pricing;
                this.property_type="property_sales";
                this.property_uid=this.wishlistresult[i].productdetails.product_uid;
                this.property_data.push({'name':this.property_name,'property_id':this.property_uid,'type':this.property_type,'price':this.property_price});
                }
                if(this.wishlistresult[i].productdetails.expected_rent != null){
                  this.property_name=this.wishlistresult[i].productdetails.build_name;
                  this.property_price=this.wishlistresult[i].productdetails.expected_rent;
                  this.property_type="property_rent";
                  this.property_uid=this.wishlistresult[i].productdetails.product_uid;
                  this.property_data.push({'name':this.property_name,'property_id':this.property_uid,'type':this.property_type,'price':this.property_price});
               }
            }
           
          } 
          //  loop closed 
            this.userEmail = this.tokenStorage.getUser().email;
            this.type      = "wishlist_page";
            this.user_cart = this.property_data;
            // console.log(this.user_cart);
            // console.log(this.userEmail);
            // console.log(this.pro_id);
            // console.log(this.type);

            
            // console.log(this.device_info);
            // console.log(this.browser_info);
            // console.log(this.url_info);
            // console.log(this.ip_address);
            // console.log(this.input_info);
            this.authService.user_logs(this.ip_address,this.device_info,this.browser_info,this.url_info,this.pro_id,this.type,this.userEmail,this.input_info,this.user_cart).subscribe(
              data => {
                this.showLoadingIndicator = false;
                // this.router.navigateByUrl("")
                // .then(() => {
                //   window.location.reload();
                // });
              });
          
        }
        // user logs funtionalty


        this.showLoadingIndicator = false;
        this.wishlist_info();
        this.pro_comp_refresh();
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.showLoadingIndicator = false;
      }
    );
  }
  wishlist_remove(data: any) {
    if (this.tokenStorage.getUser() != null) {
      this.isLoggedIn = true
      this.showLoadingIndicator = true;
      this.authService.WishlistRemove(data).pipe().subscribe(
        (result: any) => {
          //console.log(result);
          this.toastr.error('Remove Wishlist Property','Property', {
            timeOut: 2000,
          });
          this.property_data=[];
          this.showLoadingIndicator = false;
          this.getwishlist();
        },
        err => {
          //console.log(err.error);
          this.showLoadingIndicator = false;
        }
      );
    }
    else {
      this.redirect_to_home();
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
      this.e = num;
      var t = (this.e = this.e ? this.e.toString() : "").substring(this.e.length - 3)
        , n = this.e.substring(0, this.e.length - 3);
      return "" !== n && (t = "," + t),
        n.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + t
    }
    return num;
  }

  redirect_to_home(): void {
    window.location.href = GlobalConstants.siteURL = "login"
  }
  prod_func(data) {
    //console.log(this.idservice.saveProdId(data));
    // this.myservice.setData(data);
    // this.router.navigate(["/productpage"])
  }
  // Property wishlist refresh 
  wishlist_info() {
    this.userService.emit<string>('true');
  }



  // topbar proeprty comparion functionalty
  pro_comp_refresh() {
    this.userService.pro_comp_emit<string>('true');
  }

  // property comparision redirect comapre page 
  redirect_to_compare(): void {
    window.location.href=GlobalConstants.siteURL="compare"
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
