import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from './../_services/token-storage.service';
import { GlobalConstants } from './../global-constants';
import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { UserService } from './../_services/user.service';
import { Component,  OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit {
  [x: string]: any;
  prod_id: any ;
  public user_data:any;
  public login_userID:number= null;
  public login_useremail:number= null;
  public login_usertype:number = null;
  public productdata:any;
  public ftpstring: string = GlobalConstants.ftpURL;
  public sitestring: string = GlobalConstants.siteURL;
  public paytm_form_url: string = GlobalConstants.Paytm_formURL;
  public p_img1:string=null;
  public p_img2:string=null;
  public p_img3:string=null;
  public p_img4:string=null;
  public p_img5:string=null;
  public Product_id:number=0;
  public amenties_length:number=0;
  e: any={};
  
  public errorMessage:any;
  Message: any;
  form: any;
  Review: any;
  cityValue: any;
  plans_type:any;
  resp_status:any;  
  order_data:any;
  public order_data_length:number=0;
  public user_transaction_status:boolean=false;


  public showLoadingIndicator:boolean= false;
  content: any = {};
  isLoggedIn:boolean=false;
  first_prod = null;
  second_prod = null;
  third_prod = null;
  product_amenties_length:number=0;
  product_amenties:any;
  public product_images:any;
  public product_img_length:number=null;
  public latCus:number;
  public longCus:number;
  public Recently_User_Data:any;
  public Recent_user_length:number=0;
  public recently_length:number=null;
  public isReadMore :boolean=true;
  public product_uid:any;
  public imageObject:any=[];
  public video_link:number=0;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private idService: TokenStorageService,
    private router: Router,
    private route:ActivatedRoute,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private tokenService: TokenStorageService
  ) { 
        this.route.queryParams.subscribe((params) => {
        this.id = params.id;
        this.resp_status = params.status;
        if(this.resp_status != null){
          this.payment_status(this.resp_status);
        }
        this.Product_id=this.id;
        this.single_property_data(this.id);
          if (this.tokenStorage.getToken() != null){
            this.check_order_product(this.id);
          }
        }); 
    }

  ngOnInit(): void {
    
    this.titleService.setTitle('Property Page');
    // this.prod_id = this.idService.getProdId();
    if (this.tokenStorage.getToken() != null){
      this.isLoggedIn = true;
      this.login_userID = this.idService.getUser().id;
      this.login_useremail =this.idService.getUser().misc?.email;
      this.login_usertype = this.idService.getUser().usertype; 
    }
    this.amenities();
    if (this.tokenStorage.getToken() != null){
      this.isLoggedIn = true;
      this.loginuser_countProduct(this.id);
    }
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
         
          this.productdata = data["product"];
          this.video_link=data["product"]["0"].video_link.length;
          
          this.product_amenties= data["product"]["0"].amenities;
          this.product_amenties_length= data["product"]["0"].amenities.length;
          // console.log(this.product_amenties_length);
         
          this.cityValue=data["product"]["0"]["city"];
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
        this.productdata = data["product"];
        this.video_link=data["product"]["0"].video_link.length;
        // console.log(this.productdata);
        this.product_amenties= data["product"]["0"].amenities;
        this.product_amenties_length= data["product"]["0"].amenities.length;
        this.cityValue=data["product"]["0"]["city"];
        this.showLoadingIndicator = false;
      },
        err => {
          this.showLoadingIndicator = false;
        }
      );
    }
  }
  // payment status
  payment_status(resp_status){
    if(resp_status=='01'){
      this.toastr.success('Payment Successful', 'Property', {
        timeOut: 8000,
      }); 
    }
    if(resp_status=='227'){
      this.toastr.error('Payment Failed', 'Property', {
        timeOut: 8000,
      }); 
    }
    if(resp_status=='141'){
      this.toastr.info('Payment Cancelled', 'Property', {
        timeOut: 8000,
      }); 
    }
  }
   amenities(): void{
    this.showLoadingIndicator = true;
     this.userService.getamenitiesdata().pipe().subscribe(
       (amenitiesdata: any) => {
         this.amenities = amenitiesdata.data;
         this.amenitiesresult = this.amenities;
         this.amenties_length=this.amenitiesresult.length;
         this.showLoadingIndicator = false;
       },
       err => {
         this.content = JSON.parse(err.error).message;
       }
     );
   }
  loginuser_countProduct(id: any){
    //console.log(this.id);
     this.authService.User_productCount(this.id).subscribe(
       data => {
         //console.log(data);
       });
   
   }
   

showText() {
  this.isReadMore = !this.isReadMore
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
proceedToPayment(planid){  
  this.plans_type="single_rental_property"; 
  this.authService.proceedToPayment(planid,this.plans_type).pipe().subscribe(
    (response: any) => {
      if(response.status == 201){
        this.paytm =response.data;
        this.createPaytmForm();
      }else{
        this.toastr.error("Invalid Arrgument", 'Something Error!!!...', {
          timeOut: 1500,
        });
      }
    },
    err => {
      //this.content = JSON.parse(err.error).message;
      this.content = err.error.message;
    }
  );
}
createPaytmForm() {
   const my_form: any = document.createElement('form');
    my_form.name = 'paytm_form';
    my_form.method = 'post';
    my_form.action = this.paytm_form_url;
 
    const myParams = Object.keys(this.paytm);
    for (let i = 0; i < myParams.length; i++) {
      const key = myParams[i];
      let my_tb: any = document.createElement('input');
      my_tb.type = 'hidden';
      my_tb.id = key;
      my_tb.name = key;
      my_tb.value = this.paytm[key];
      my_form.appendChild(my_tb);
    };
    // console.log(my_form);
    document.body.appendChild(my_form);
    my_form.submit();
  }  
  
  Amenties_funtion(Amenties_id:any){
    if(this.product_amenties_length !=null){
      for (let i = 0; i < this.product_amenties_length; i++) {
        if(Amenties_id==this.product_amenties[i].amenties){
          return  true;
        }
      }
    }
    return false;
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
check_order_product(id:any){
  this.showLoadingIndicator = true;
  this.authService.check_order_product(this.id).subscribe(
    data => {
      this.showLoadingIndicator = false;
      this.order_data=data["0"];
      this.order_data_length=data.length;
      // console.log(this.order_data_length);
      if(this.order_data_length>0){
        if(this.order_data.transaction_status == 'TXN_SUCCESS'){
          // console.log(this.order_data.transaction_status);
          this.user_transaction_status=true;
        }
      }
    },
      err => {
       // console.log(err);
      }
    );
  
}
  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
  }
  redirect_to_home_page(): void {
    window.location.href=GlobalConstants.siteURL
  }
  
   // topbar searching functionalty
   wishlist_info(){
      this.userService.emit<string>('true');
   } 
   // topbar proeprty comparion functionalty
  pro_comp_refresh(){
    this.userService.pro_comp_emit<string>('true');
  } 

  // property comparision redirect comapre page 
  redirect_to_compare(): void {
    window.location.href=GlobalConstants.siteURL="compare"
  }
} 
 
