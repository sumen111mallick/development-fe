import { TokenStorageService } from './../_services/token-storage.service';
import { Router } from '@angular/router';
import { ProductService } from './../_services/product.service';
import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { DomSanitizer, SafeUrl, Title } from '@angular/platform-browser';
// import { Component, OnInit } from '@angular/core';
import { AuthService } from './../_services/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgForm } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Options,LabelType } from 'ng5-slider';
import { MapsAPILoader,AgmMap } from '@agm/core';
// import { google } from "google-maps";
import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HostListener } from "@angular/core";
import { UserLogsService } from './../_services/user-logs.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  options: Options = {
    step:1000,
    floor: 5000,
    ceil: 50000000,
    translate: (value: number, label: LabelType): string => {
      return '₹' + value.toLocaleString('en');
    }
  };
  options_sales: Options = {
    step:1000,
    floor: 500000,
    ceil: 50000000,
    translate: (value: number, label: LabelType): string => {
      return '₹' + value.toLocaleString('en');
    }
  };
  options_rent: Options = {
    step:500,
    floor: 5000,
    ceil: 500000,
    translate: (value: number, label: LabelType): string => {
      return '₹' + value.toLocaleString('en');
    }
  };


  [x: string]: any;
  currentUser: any;
  currentUserid: any;
  form: any = {};
  data: any = {};
  content: any = {};
  ftpstring: string= GlobalConstants.ftpURL;
  prod_if: any;  
  public feature_property_data:any={};
  public feature_pro_length:number=0;
  public Recently_UserData:any={};
  public Recent_user_length:number=0;
  public isLoggedIn:boolean=false;
  public range_slider:boolean= true;
  public rent_range_slider:boolean= false;
  public buyyer_range_slider:boolean= false;
  public showLoadingIndicator:boolean=false;
  amenityArray = [];
  selectedItems:string[];

    build_name:any;
    Location:any; 
    type:number;
    Bathrooms:any;
    Bedrooms:any;
    availability_condition:any;
    area_unit:any;
    Years:number;
    Minimum:number=0;
    Maximum:number=50000000;
    e: any={};
   Search_data_length:number=0;
   public secach_amenties_length:number=null;
   public product_type:string=" ";
   screenWidth: number;
   public deshtop_view:boolean=true;
   public mobile_view:boolean=true;

    // map google
  geoCoder:any;
  // searchElementRef:any;
  latCus=78.89;
  longCus=76.897;
  @ViewChild("search") searchElementRef: ElementRef;
  @ViewChild(AgmMap,{static: true}) public agmMap: AgmMap;
  zoom: number;
  location: string;
  homepage_data:any;
  Searchcontent:any;
  public p: number;
  public property_type:any;
  public property_type_result:any;
  public property_type_count:any;
  public property_type_count_length:number=0;
  pro_id:any=null;
  page_type:any;
  device_info:any;
  browser_info:any;
  url_info:string;
  url: any;
  input_info:any=null;
  user_cart:any=null;
  ip_address:any; 
  ipAddress:string;		
  userEmail:any;	

  displayStyle = "none";
  first_prod = null;
  second_prod = null;
  third_prod = null;
  public property_heading:string;

  constructor(
    private titleService: Title,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private myservice: ProductService,
    private idservice: TokenStorageService,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private tokenStorage: TokenStorageService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone:NgZone,
    private toastr: ToastrService,
    private userlogs: UserLogsService
    
  ) {
    this.form.property_status='all';
    this.getScreenSize();
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}

  ngOnInit(): void {
    this.form.Minimum= '5000';
    this.form.Maximum='50000000';
    this.form.property_status='all';
    
    this.url_info     = this.url;       
    this.device_info  = this.userlogs.getDeviceInfo();
    this.browser_info = this.userlogs.getbrowserInfo();
    this.ip_address   = this.userlogs.getIpAddress();
    this.url_info  = this.userlogs.geturl();

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // this.latCus = place.geometry.location.lat();
          // this.longCus = place.geometry.location.lng();
          this.location = place.formatted_address;
          this.zoom = 15;
          this.form.Location=this.location;

        });
      });
    });

    this.selectedItems = new Array<string>();
    this.idservice.saveCdata(null);
    this.idservice.saveProdId(null);
    this.titleService.setTitle('Listing');
    this.amenities();
    this.getpropertyData();

    // this.onSearch();
    if (this.tokenStorage.getToken() != null){
      this.isLoggedIn = true;
      this.currentUser = this.tokenService.getUser().username;
      this.currentUserid = this.tokenService.getUser().id;
      this.login = this.tokenService.getToken();
      this.loginuser_coutData();
    }

  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <768){
      this.deshtop_view=false;
      this.mobile_view=true;  
    }else{
      this.deshtop_view=true;
      this.mobile_view=false; 
    }
 }
loginuser_coutData(){
  this.showLoadingIndicator = true;
  this.authService.recently_view().subscribe(
    data => {
      //console.log(data.data);
      this.Recently_UserData = data.data;
      this.Recent_user_length=data.data.length;
      this.showLoadingIndicator = false;
      //console.log("Recently Views Properties");
        //console.log(this.Recently_UserData);
    });

}
  getpropertyData(): void{
    this.showLoadingIndicator = true;
    this.property_heading='No Filters Applied';
    if(this.idservice.returnSearch() != null ){
      //console.log("session");
      this.content_session = this.idservice.returnSearch();
      this.Searchcontent =this.idservice.returnSearch()['data'];
      this.Search_data_length=this.Searchcontent.length;
          if(this.idservice.get_pro_type() != null){
            //console.log(this.idservice.get_pro_type());
            this.form.type=this.idservice.get_pro_type()['0'];  
            this.product_type=this.idservice.get_pro_type()['1'];
            //console.log(this.form.type);
          }
      //console.log( this.Searchcontent);  
      this.homepage_data=this.idservice.get_formData();
        if(this.homepage_data != null){
          this.form.build_name=this.homepage_data['0']['build_name'];
          this.form.Location=this.homepage_data['0']['Location'];
          this.form.type=this.homepage_data['0']['type'];
          //console.log(this.form.type);
          this.form.Bathrooms=this.homepage_data['0']['Bathrooms'];
          this.form.Bedrooms=this.homepage_data['0']['Bedrooms'];
          this.form.Years=this.homepage_data['0']['Years'];
          this.form.Minimum = this.homepage_data['0']['sliderControl'][0];
          this.form.Maximum = this.homepage_data['0']['sliderControl'][1];
          this.form.area_unit=this.homepage_data['0']['area_unit'];
          this.form.availability_condition=this.homepage_data['0']['search_type'];
          this.form.search_type=this.homepage_data['0']['search_type'];
          this.secach_amenties_length=this.homepage_data['1'].length;
          //console.log( this.secach_amenties_length);
          this.search_type=this.form.search_type;
          if(this.search_type=='rent'){ 
            //console.log(this.form.Minimum);
            //console.log(this.form.Maximum); 
            this.rent_range_slider=true;
            this.buyyer_range_slider=false;
            this.range_slider=false;
          }
          if(this.search_type=='sales'){  
            //console.log(this.form.Minimum);
            //console.log(this.form.Maximum);
            this.rent_range_slider=false;
            this.buyyer_range_slider=true;
            this.range_slider=false;
          }
        } 
      this.showLoadingIndicator = false;
    }else{
      //console.log("without session");
      if(this.tokenStorage.getToken()){
        this.isLoggedIn = true;
        this.authService.product_listing_wishlist().pipe().subscribe(
          (product: any) => {
            this.content = product.data;
            this.Searchcontent = this.content;
            this.Search_data_length=this.Searchcontent.length;
            console.log(product);
            // console.log(data.data[0]['0']);
            console.log(this.Searchcontent);
            // console.log(this.Searchcontent[0].product_img);
            //console.log(this.Search_data_length);
            this.wishlist_info();
            this.pro_comp_refresh();
            this.showLoadingIndicator = false;
          },
          err => {
            //this.content = JSON.parse(err.error).message;
            this.content = err.error.message;
            this.showLoadingIndicator = false;
          }
        );
      }else{
        this.userService.product_list_featured().pipe().subscribe(
          (data: any) => {
            this.content = data.data;
            this.Searchcontent = this.content;
            this.Search_data_length=this.Searchcontent.length;
            console.log(data);
            console.log(this.Searchcontent); 
            //console.log(this.Search_data_length);  
            this.showLoadingIndicator = false;
          },
          err => {
            this.content = JSON.parse(err.error).message;
            this.showLoadingIndicator = false;
          }
        );
      }
    }
  }

OnPropertyCheck():void{
    //console.log(this.form.availability_condition);
  if(this.form.availability_condition=='rent'){ 
    this.form.Minimum=1;
    this.form.Maximum=500000; 
    this.rent_range_slider=true;
    this.buyyer_range_slider=false;
    this.range_slider=false;
    //console.log('rent');
  }
  if(this.form.availability_condition=='sales'){ 
  this.form.Minimum=500000;
  this.form.Maximum=50000000; 
    this.rent_range_slider=false;
    this.buyyer_range_slider=true;
    this.range_slider=false;
    //console.log('sales');
  }
  if(this.form.availability_condition=='Select Availability'){ 
   this.form.Minimum=1;
   this.form.Maximum=50000000; 
    this.rent_range_slider=false;
    this.buyyer_range_slider=false;
    this.range_slider=true;
    //console.log('Nothing');
  }   
}
amenities(): void{
  this.showLoadingIndicator = true;
  this.userService.getamenitiesdata().pipe().subscribe(
    (amenitiesdata: any) => {
      //  console.log(amenitiesdata);
      this.amenities = amenitiesdata.data;
      this.amenitiesresult = this.amenities;
      this.showLoadingIndicator = false;
      //console.log(this.amenitiesresult);
      //console.log(this.content);
    },
    err => {
      this.content = JSON.parse(err.error).message;
      this.showLoadingIndicator = false;
    }
  );
}
Amenties_funtion(Amenties_id:any){
    // var len= this.product_amenties.length; 
  if(this.secach_amenties_length !=null){
    for (let i = 0; i < this.secach_amenties_length; i++) {
      if(Amenties_id==this.homepage_data['1'][i]){
        return true;
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
    this.maintenance = true;
    this.parking = false;
    this.showLoadingIndicator = true;
      this.authService.Crete_product_comp(id).pipe().subscribe(
        (data: any) =>{
          //console.log(data);
          this.getpropertyData();
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
         // console.log(err.error);
         this.showLoadingIndicator = false;
        }
      );
  }
  else{
    this.redirect_to_home();
  }
}
  wishlist_added(data: any){
    console.log(data);
    // Login check
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true;
      this.maintenance = true;
      this.parking = false;
      this.showLoadingIndicator = true;
        this.authService.Wishlist(data).pipe().subscribe(
          (result: any) =>{
            console.log(result);
            this.showLoadingIndicator = false;
            this.getpropertyData();
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

  Wishlist_remove(data: any){
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true;
      this.showLoadingIndicator = true;
       this.authService.WishlistRemove(data).pipe().subscribe(
        (result: any) =>{
          //console.log(result);
          this.showLoadingIndicator = false;
          this.getpropertyData();
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

  onchangeAmenties(e:any,id:string){
    if(e.target.checked){
      //console.log(id + 'Checked');
      this.selectedItems.push(id);
    }else{

      //console.log(id + 'UNChecked');
      this.selectedItems= this.selectedItems.filter(m=>m!=id);
    }
    this.amenityArray=this.selectedItems;
   //console.log(this.amenityArray);

  }
  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
    }

    onchangeSearch():void{
      this.onSearch();
    }
    Property_type_search(id: number,pro_type: string):void{
      this.tokenService.RemoveSearch();
      this.tokenService.Remove_form_data();
      this.tokenService.Remove_pro_type();
      this.form.type=id;
      //console.log(this.form.type);
      if(this.tokenStorage.getToken()){
        //console.log('logging');
        this.showLoadingIndicator = true;
        this.authService.search_pro_type_login(id).subscribe(
          data => {
            this.Searchcontent = data.data;
            console.log(this.Searchcontent);
            this.Search_data_length=this.Searchcontent.length;
            this.showLoadingIndicator = false;
          },
          err => {
            //console.log(err.error);
            this.showLoadingIndicator = false;
          }
        );
      }
      else{
        this.showLoadingIndicator = true;
        this.authService.search_pro_type(id).subscribe(
          data => {
            console.log(data);
            this.Searchcontent = data.data;
            this.Search_data_length=this.Searchcontent.length;
            this.showLoadingIndicator = false;
          },
          err => {
            //console.log(err.error);
            this.showLoadingIndicator = false;
          }
        );
      }
    }

    onSearch(): void{
    //  console.log(this.form);
      //console.log(this.amenityArray);
    this.property_heading='Searching';
        if(this.tokenStorage.getToken()){
          this.isLoggedIn = true;  
          this.showLoadingIndicator = true;
          this.authService.product_SearchingLogin(this.form,this.amenityArray).subscribe(
            searchData => {
              //console.log("login");
              console.log(searchData);
              this.Searchcontent = searchData.data;
              if(this.Searchcontent){
                 this.number = this.Searchcontent;
                // console.log(this.number);
                 this.Search_data_length=this.Searchcontent.length;
                 this.showLoadingIndicator = false;
                 this.pro_comp_refresh();
                 this.wishlist_info();
              }
                // user logss functionalty
                if(this.Searchcontent){
                  this.userEmail= this.tokenStorage.getUser().misc.email;
                  this.page_type   = "registration_page";
                  this.input_info= this.form;
                  this.authService.user_logs(this.ip_address,this.device_info,this.browser_info,this.url_info,this.pro_id,this.page_type,this.userEmail,this.input_info,this.user_cart).subscribe(
                    data => {
                      console.log(data.status);
                    });
                }
                // user logss functionalty
              
            },
            err => {
              this.err_caused = true;
              this.errorMessage = err.error.errors;
              this.showLoadingIndicator = false;
              //console.log(this.errorMessage);
            } 
          );
        }else{
          this.showLoadingIndicator = true;
          this.authService.product_Searching(this.form,this.amenityArray).subscribe(
            searchData => {
              console.log(searchData);
              this.Searchcontent = searchData.data;
              if(this.Searchcontent){
                this.showLoadingIndicator = false;
                this.Search_data_length=this.Searchcontent.length;
                this.number = this.Searchcontent;

              //console.log(this.number);
              }
              
            },
            err => {
              this.err_caused = true;
              this.errorMessage = err.error.errors;
              this.showLoadingIndicator = false;
              //console.log(this.errorMessage);
            }
            );
        }
        this. closePopup();

    }
  reset_Search():void{
    this.tokenService.RemoveSearch();
    this.tokenService.Remove_form_data();
    this.tokenService.Remove_pro_type();
    window.location.href=GlobalConstants.siteURL+"productlisting";
    this.getpropertyData();
    // this.openPopup();

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


// modal popup funtionalty  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
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
