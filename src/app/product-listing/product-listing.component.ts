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
@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  options: Options = {
    floor: 0,
    ceil: 50000000
  };

  showLoadingIndicator :boolean= false;
  [x: string]: any;
  currentUser: any;
  currentUserid: any;
  form: any = {};
  data: any = {};
  content: any = {};
  ftpstring: string= GlobalConstants.ftpURL;
  prod_if;  
  amenityArray = [];
  selectedItems:string[];
  searchForm = { 
    build_name: '',
    Location  : '', 
    area_unit : '',
    type : '',
    Bathrooms   : '',
    Bedrooms : '',
    availability_condition : '',
    Years   : '',
    Minimum : '',
    Maximum   : '',
    };
    Search_data_length=0;

    // map google
  geoCoder:any;
  // searchElementRef:any;
  latCus=78.89;
  longCus=76.897;
  @ViewChild("search") searchElementRef: ElementRef;
  @ViewChild(AgmMap,{static: true}) public agmMap: AgmMap;
  zoom: number;
  location: string;


  first_prod = null
  second_prod = null
  third_prod = null

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
    
  ) {
    this.getpropertyData();
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}

  ngOnInit(): void {
    this.form.Minimum=0;
    this.form.Maximum=50000000;
        
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
          this.latCus = place.geometry.location.lat();
          this.longCus = place.geometry.location.lng();
          this.location = place.formatted_address;
          this.zoom = 15;
          // console.log(this.latCus);
          // console.log(this.location);
          this.form.Location=this.location;
          // this.form.map_latitude=this.latCus;
          // this.form.map_longitude=this.longCus;
        
        });
      });
    });

    this.selectedItems = new Array<string>();
    this. amenities();
    this.feature_property();
    this.idservice.saveCdata(null);
    this.idservice.saveProdId(null);
    this.titleService.setTitle('Listing');
    // this.getpropertyData();
    this.onSearch();
    if (this.tokenStorage.getToken() != null){
      this.isLoggedIn = true;
      this.currentUser = this.tokenService.getUser().username;
      this.currentUserid = this.tokenService.getUser().id;
      this.login = this.tokenService.getToken();
      this.loginuser_coutData();
    }
    
  }

  loginuser_coutData(){
    this.authService.get_CountData().subscribe(
      data => {
        console.log(data.data);
        this.Recently_UserData = data.data;
        console.log("Recently Views Properties");
         console.log(this.Recently_UserData);
      });
  
  }

  getpropertyData(): void{
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;  
      this.authService.getproductWishlist().pipe().subscribe(
        (product: any) => {  
          this.content = product.data;
          this.number = this.content;
          // console.log(data.data[0]['0']);
          console.log(this.number);
          console.log(this.number[0]);
          this.sendinformation();
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );   
    }else{
      this.userService.getproductlistingfeatured().pipe().subscribe(
        (data: any) => {
  
          this.content = data.data.data;
          this.number = this.content;
          console.log(this.number);          
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }
  }

  amenities(): void{
    this.userService.getamenitiesdata().pipe().subscribe(
      (amenitiesdata: any) => {
        //  console.log(amenitiesdata);
        this.amenities = amenitiesdata.data;
        this.amenitiesresult = this.amenities;
        console.log(this.amenitiesresult);
        //console.log(this.content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  DeleteProd_function(data: any){
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true;
       this.authService.WishlistRemove(data).pipe().subscribe(
        (result: any) =>{
          console.log(result);
          this.onSearch();
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
  feature_property():void{
    this.userService.getRecently_viewProperty().subscribe(
      featureproperty => { 
        this.feature_property = featureproperty.data;
        console.log("feature_properties");
        console.log(this.feature_property);        
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  
  prod_function(data: any){
    // Login check
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true
      console.log(this.isLoggedIn);
    }
    else{
      this.redirect_to_home();
    }
    this.maintenance = true;
    this.parking = false;
    if (this.tokenStorage.getToken()){
      this.isLoggedIn = true;      
      this.authService.Wishlist(data).pipe().subscribe(
        (result: any) =>{
          console.log(result);
          this.onSearch();
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
  onchangeAmenties(e:any,id:string){
    if(e.target.checked){
      console.log(id + 'Checked');
      this.selectedItems.push(id);
    }else{
      
      console.log(id + 'UNChecked');
      this.selectedItems= this.selectedItems.filter(m=>m!=id);
    }
    this.amenityArray=this.selectedItems;
   console.log(this.amenityArray);

  }

  prod_func(data){
    this.idservice.saveProdId(data);
    // this.myservice.setData(data);
    // this.router.navigate(["/productpage"])
  }

  onComp(data){


    // Old code

    // console.log(this.idservice.getCdata());
    // console.log(this.idservice.getProdId());


    // if(this.idservice.getCdata() != null){
    //   this.idservice.saveProdId(data);
    //   console.log(this.idservice.getCdata());
    //   console.log(this.idservice.getProdId());
    //   console.log("1rd");
    // }

    // if(this.idservice.getCdata()){

    //   this.prod_if = this.idservice.getCdata;
    //   this.idservice.saveProdId(this.prod_if);
    //   this.idservice.saveCdata(data);
    //   console.log(this.idservice.getCdata());
    //   console.log(this.idservice.getProdId());
    //   console.log("3rd");
    // }


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

      this.idservice.saveProdId(this.first_prod);
      this.idservice.saveCdata(this.second_prod)
      this.idservice.saveProd2Id(this.third_prod);
      window.location.href=GlobalConstants.siteURL+"compare"
    }

    console.log(this.idservice.getProdId());
    console.log(this.idservice.getProd2Id());
    console.log(this.idservice.getCdata());



  }
  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
    }

    onchangeSearch():void{
      console.log(this.form.property_status);
      this.onSearch();
    }


    onSearch(): void{
      console.log(this.form);
      console.log(this.amenityArray);
        if(this.tokenStorage.getToken()){
          this.isLoggedIn = true;  
          this.showLoadingIndicator = true;
          this.authService.product_SearchingLogin(this.form,this.amenityArray).subscribe(
            searchData => {
              console.log("login");
              console.log(searchData);
              this.Searchcontent = searchData.data;
              if(this.Searchcontent){
                 this.number = this.Searchcontent;
                 this.Search_data_length=this.Searchcontent.length;
                 this.showLoadingIndicator = false;
                 this.sendinformation();
              }
              
            },
            err => {
              this.err_caused = true;
              this.errorMessage = err.error.errors;
              console.log(this.errorMessage);
            } 
          );
        }else{
          this.showLoadingIndicator = true;
          this.authService.product_Searching(this.form,this.amenityArray).subscribe(
            searchData => {
              console.log("without_login");
              this.Searchcontent = searchData.data;
              if(this.Searchcontent){
                this.showLoadingIndicator = false;
                this.Search_data_length=this.Searchcontent.length;
                this.number = this.Searchcontent;
              // console.log(this.number);
              }
              
            },
            err => {
              this.err_caused = true;
              this.errorMessage = err.error.errors;
              console.log(this.errorMessage);
            }
            );
        }
  
    }

    // topbar searching functionalty

    sendinformation(){
      this.userService.emit<string>('true');
   } 
   // carosule image
   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow"></i>'],
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
