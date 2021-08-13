import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from './../_services/token-storage.service';
import { GlobalConstants } from './../global-constants';
import { ProductService } from './../_services/product.service';
import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
// import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';
import { MapsAPILoader,AgmMap } from '@agm/core';
// import { google } from "google-maps";
import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxStarRatingModule } from 'ngx-star-rating';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit {
  [x: string]: any;

  prod_id: any ;
  public user_data:any={};
  public login_userID:number= null;
  public login_usertype:number = null;
  public productdata:any={};
  public ftpstring: string = GlobalConstants.ftpURL;
  public sitestring: string = GlobalConstants.siteURL;
  public p_img1:string=null;
  public p_img2:string=null;
  public p_img3:string=null;
  public p_img4:string=null;
  public p_img5:string=null;
  e: any={};
  // p_img2= null;
  // p_img3= null;
  // p_img4= null;
  // p_img5= null;
  
  public errorMessage:any ={};
  Message: any={};
  form: any = {};
  Review: any;
  map_url: string;
  cityValue: any;
  
  public showLoadingIndicator:boolean= false;
  content: any = {};
  isLoggedIn:boolean=false;
  first_prod = null;
  second_prod = null;
  third_prod = null;
  product_amenties_length=null;
  product_amenties:any={};
  public product_images:any={};
  public product_img_length:number=null;
  public latCus:number;
  public longCus:number;
  public feature_property_data:any={};
  public Recently_User_Data:any={};
  public recently_length:number=null;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private idService: TokenStorageService,
    private prodservice: ProductService,
    private router: Router,
    private route:ActivatedRoute,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone:NgZone,
    private toastr: ToastrService
  ) { 
        this.route.params.subscribe((params) => {
        this.id = params["id"];
        this.single_property_data(this.id);
     }); }

  ngOnInit(): void {
    this.titleService.setTitle('Property Page');
    this.prod_id = this.idService.getProdId();
    if (this.tokenStorage.getToken() != null){
      this.isLoggedIn = true;
      this.login_userID = this.idService.getUser().id;
      console.log(this.login_userID);
      this.login_usertype = this.idService.getUser().usertype;
      console.log(this.login_usertype);

    }
    
  
    if( this.idService.getUser() != null)
    {
      this.authService.saveSearch(this.idService.getUser().id, this.id).subscribe(
        data => {
          console.log(data)
        },
        err => {
          console.log(err)
        }
      )
    }
    this.get_review();
    this.Property_type_data();
    this.amenities();
    this.feature_property();
    this.idService.saveCdata(null);
    this.idService.saveProdId(null);
    if (this.tokenStorage.getToken() != null){
      this.isLoggedIn = true;
      this.loginuser_countProduct(this.id);
      this.loginuser_coutData();
    }
  }
  single_property_data(id: any){
    console.log(id);
    this.showLoadingIndicator = true;
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true;
      console.log(this.isLoggedIn);
      this.authService.product_login_see(id).subscribe(
        data => {
          console.log(data);
          console.log(data["product"]["0"].product_img[0].image);
          this.product_images=data["product"]["0"].product_img;
          this.product_img_length=this.product_images;
          this.productdata = data["product"];
          this.map_url = "https://maps.google.com/?q=" + data["product"]["0"]["map_latitude"] + "," + data["product"]["0"]["map_longitude"];
          console.log(this.map_url)
          this.product_amenties= data["product"]["0"].amenities;
          this.product_amenties_length= data["product"]["0"].amenities.length;
          console.log(this.product_amenties_length);
          console.log(this.product_amenties);
          this.cityValue=data["product"]["0"]["city"];
          this.latCus=parseFloat(data["product"]["0"]["map_latitude"]);
          console.log(this.latCus);
          this.longCus=parseFloat(data["product"]["0"]["map_longitude"]);
          console.log(this.longCus);
          this.similarproperty(this.cityValue);
          this.showLoadingIndicator = false;
  
        },
          err => {
            console.log(err);
          }
        );
    }else{
      this.authService.product_see(id).subscribe(
      data => {
        console.log(data);
        // console.log(data["product"]["0"].product_img[0].image);
        this.product_images=data["product"]["0"].product_img;
        this.product_img_length=this.product_images;
        this.productdata = data["product"];
        this.map_url = "https://maps.google.com/?q=" + data["product"]["0"]["map_latitude"] + "," + data["product"]["0"]["map_longitude"];
        console.log(this.map_url)
        this.product_amenties= data["product"]["0"].amenities;
        this.product_amenties_length= data["product"]["0"].amenities.length;
        console.log(this.product_amenties_length);
        console.log(this.product_amenties);
        this.cityValue=data["product"]["0"]["city"];
        this.latCus=parseFloat(data["product"]["0"]["map_latitude"]);
        console.log(this.latCus);
        this.longCus=parseFloat(data["product"]["0"]["map_longitude"]);
        console.log(this.longCus);
        this.similarproperty(this.cityValue);
        this.showLoadingIndicator = false;

      },
        err => {
          console.log(err);
        }
      );
    }
  }
  
   amenities(): void{
    this.showLoadingIndicator = true;
     this.userService.getamenitiesdata().pipe().subscribe(
       (amenitiesdata: any) => {
         this.amenities = amenitiesdata.data;
         this.amenitiesresult = this.amenities;
         this.Amenties_length=this.amenitiesresult.length;
         this.showLoadingIndicator = false;
       },
       err => {
         this.content = JSON.parse(err.error).message;
       }
     );
   }
  loginuser_coutData(){
    this.showLoadingIndicator = true;
    this.authService.recently_view().subscribe(
      data => {
        console.log(data.data);
        this.Recently_User_Data = data.data;
        this.recently_length=this.Recently_User_Data.length;
        this.showLoadingIndicator = false;
        console.log("Recently Views Properties");
         console.log(this.Recently_User_Data.length);
      });
  
  }
  loginuser_countProduct(id: any){
    console.log(this.id);
     this.authService.User_productCount(this.id).subscribe(
       data => {
         console.log(data);
       });
   
   }
   
// product comaprision functinalty 
product_comp(id:number){
  console.log(id);
  // Login check
  if(this.tokenStorage.getUser() != null){
    this.isLoggedIn = true;
    console.log(this.isLoggedIn);
    this.maintenance = true;
    this.parking = false;     
      this.authService.Crete_product_comp(id).pipe().subscribe(
        (data: any) =>{
          console.log(data);
          this.similarproperty(this.cityValue);
          this.single_property_data(this.id);
          console.log(data.data.length);
          if(data.data.length>4){
            this.toastr.info('Bucket are the Full...!!!', 'Property', {
              timeOut: 3000,
            });
          }else{
            this.toastr.success('Succesfully Added in Bucket...', 'Property', {
              timeOut: 3000,
            });
          }
        },
        err => {
          console.log(err.error);
        }
      );
  }
  else{
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
    if(this.tokenStorage.getUser() != null){
      if (this.tokenStorage.getToken()){
        // this.isLoggedIn = true;      
        this.authService.Wishlist(data).pipe().subscribe(
          (result: any) =>{
            console.log(result);
            this.similarproperty(this.cityValue);
            this.single_property_data(this.id);
          },
          err => {
            console.log(err.error);
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
          console.log(result);
          this.similarproperty(this.cityValue);
          this.single_property_data(this.id);
        },
        err => {
          console.log(err.error);
        }
      );
    }
    else{
      this.redirect_to_home();
    }
    
  }

  Amenties_funtion(Amenties_id:any){
    // var len= this.product_amenties.length; 
    // console.log(Amenties_id);
    // console.log(this.product_amenties);
  if(this.product_amenties_length !=null){
    for (let i = 0; i < this.product_amenties_length; i++) {
      if(Amenties_id==this.product_amenties[i].amenties){
        return  true;
      }
    }
  }
  return false;
}


Property_type_data(): void{
  this.userService.get_property_type().pipe().subscribe(
    (data: any) => {
      //  console.log(amenitiesdata);
      this.property_type = data.count;
      this.property_type_count=data.count;
      console.log(this.property_type_count);
      this.property_type_result = this.property_type;
      console.log(this.property_type_result);
      //console.log(this.content);
    },
    err => {
      this.content = JSON.parse(err.error).message;
    }
  );
}

  similarproperty(cityValue: any){
    if(this.tokenStorage.getToken()){
      this.showLoadingIndicator = true;
    this.authService.login_similarproperty(this.cityValue).subscribe(
      data => {
        this.similar_property = data["product"];
        console.log(this.similar_property);
        this.wishlist_info();
        this.pro_comp_refresh();
        this.showLoadingIndicator = false;
      },
        err => {
          console.log(err);
        }
      );
    }else{
      this.showLoadingIndicator = true;
      this.authService.product_similarproperty(this.cityValue).subscribe(
      data => {
        this.similar_property = data["product"];
        console.log(this.similar_property);
        this.showLoadingIndicator = false;
      },
        err => {
          console.log(err);
        }
      );

    }
  }

  onSubmit(): void {
    // Login check
    if(this.tokenStorage.getUser() != null){
    console.log(this.form)
    this.authService.create_review(this.form, this.id).subscribe(
      data => {
        console.log(data)
        this.toastr.success('Reviews Succesfully', 'Property', {
          timeOut: 3000,
        });
      },
      err => {
        console.log(err.error);
        this.errorMessage = err.error.errors;
        console.log(this.errorMessage.length);
        this.Message = err.error.message;
        console.log(this.Message);
        this.toastr.error(this.Message, 'Something Error', {
          timeOut: 3000,
        });
      }
    );
  }
  else{
    this.redirect_to_home();
  }
}

  get_review(): void {
    console.log(this.form)
    this.authService.product_review(this.id).subscribe(
      data => {
        console.log('sfesf')
        console.log(data)
        this.Review = data.data
      },
      err => {
        console.log(err.error);
      }
    );
}

feature_property(){
  this.userService.feature_property().subscribe(
    data => { 
      this.feature_property_data = data.data;
      console.log("feature_properties");
      console.log(this.feature_property_data);        
    },
    err => {
      this.content = JSON.parse(err.error).message;
    }
  );
}

  onShare(){
    alert("Your Shareable Link is \n" + this.sitestring + this.router.url );
  }
  onComp(data: any){

    if(this.first_prod == null){
      this.first_prod = data
    }
    else if(this.first_prod != null){
      if (this.second_prod != null){
        this.third_prod = this.second_prod
        this.second_prod = this.first_prod
        this.first_prod = data
      }
      else{
      this.second_prod = data
      }
    }

    console.log(this.first_prod+"|"+this.second_prod+"|"+this.third_prod)

    if (this.first_prod != null && this.second_prod != null && this.third_prod != null){

      // alert("Added two property to compare list. (Only two properties can be compared at a time)")

      this.idService.saveProdId(this.first_prod);
      this.idService.saveCdata(this.second_prod)
      this.idService.saveProd2Id(this.third_prod);
      window.location.href=GlobalConstants.siteURL+"compare"
    }

    console.log(this.idService.getProdId());
    console.log(this.idService.getProd2Id());
    console.log(this.idService.getCdata());
  }

  
  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
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
