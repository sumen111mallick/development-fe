// import { Component, OnInit } from '@angular/core';
import { LabelType } from 'ng5-slider';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { FormBuilder} from '@angular/forms';
import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader,AgmMap } from '@agm/core';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-home-search-form',
  templateUrl: './home-search-form.component.html',
  styleUrls: ['./home-search-form.component.css']
})
export class HomeSearchFormComponent implements OnInit {
  public isLoggedIn:boolean=false;
  public data_session:any;
  ftpstring = GlobalConstants.ftpURL;
  amenityArray = [];
  selectedItems:string[];
 public showLoadingIndicator:boolean=false;
 public rent_range_slider:boolean= true;
 public buyyer_range_slider:boolean= false;
 public amenitiesresult:any;
 form: any = {};

  
  options: Options = {
    step:1000,
    floor: 5000,
    ceil: 500000,
    translate: (value: number, label: LabelType): string => {
      return '₹' + value.toLocaleString('en');
    },
  };
  options_sales: Options = {
    step:5000,
    floor: 500000,
    ceil: 50000000,
    translate: (value: number, label: LabelType): string => {
      return '₹' + value.toLocaleString('en');
    }
  };
  
  searchForm = this.formBuilder.group({
    Bathrooms: [''],
    Bedrooms: [''],
    Years: [''],
    area_unit: [''],
    search_type: [''],
    build_name: [''],
    type: [''],
    Location: [''],
    Minimum: [''],
    Maximum: [''],
    sliderControl: [[]]
  });
  errorMessage: any;
  err_caused: boolean;
  content: any;
  geoCoder:any;
  latCus=78.89;
  longCus=76.897;
  @ViewChild("search") searchElementRef: ElementRef;
  @ViewChild(AgmMap,{static: true}) public agmMap: AgmMap;
  zoom: number;
  location: string;
  
  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone:NgZone
    ) { }

  ngOnInit(): void {
    this.searchForm.value.sliderControl[0] = 5000;
    this.searchForm.value.sliderControl[1] = 500000;
    // this.form.Minimum=1;
    // this.form.Maximum=500000;
    // this.searchForm.controls['Minimum'].setValue(1);
    this.rent_price_fun();
    // this.searchForm.controls['Maximum'].setValue(500000);
    this.searchForm.controls['search_type'].setValue('rent');
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
          // console.log(this.latCus);
          // console.log(this.location);
          // this.form.Location=this.location;
          this.searchForm.controls['Location'].setValue(this.location);
          // this.searchForm.controls['map_latitude'].setValue(this.latCus);
          // this.searchForm.controls['map_longitude'].setValue(this.longCus);
          // this.form.map_latitude=this.latCus;
          // this.form.map_longitude=this.longCus;
        
        });
      });
    });
    this.selectedItems = new Array<string>();
    this.amenities();
    
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
        //this.content = JSON.parse(err.error).message;
        this.content = err.error.message;
        this.showLoadingIndicator = false;
      }
    );
  }
  
  onSearch(): void{
    // this.showLoadingIndicator = true;
    //console.log(this.form,this.amenityArray);
    if(this.tokenStorage.getToken()){
      //console.log("login");
      this.isLoggedIn = true; 
      this.authService.Login_search_home(this.searchForm,this.amenityArray).subscribe(
        data => {
          //console.log(data);
          this.tokenService.searchData(data);
          //console.log(this.tokenService.returnSearch());
          this.data_session=[this.searchForm.value,this.amenityArray];
          this.tokenService.search_formData(this.data_session);
          // console.log(this.tokenService.get_formData());
          // this.showLoadingIndicator = false;
          window.location.href=GlobalConstants.siteURL+"productlisting";
        },
        err => {
          this.err_caused = true;
          this.errorMessage = err.error.errors;
          // this.showLoadingIndicator = false;
          //console.log(this.errorMessage);
        }
      );
    }
    else{
       //console.log("withoutlogin");
      this.authService.search(this.searchForm,this.amenityArray).subscribe(
        data => {
          //console.log(data);
          this.tokenService.searchData(data);
          //console.log(this.tokenService.returnSearch());
          this.data_session=[this.searchForm.value,this.amenityArray];
          this.tokenService.search_formData(this.data_session);
          //console.log(this.tokenService.get_formData());
          this.showLoadingIndicator = false;
          window.location.href=GlobalConstants.siteURL+"productlisting"
        },
        err => {
          this.err_caused = true;
          this.errorMessage = err.error.errors;
          this.showLoadingIndicator = false;
          //console.log(this.errorMessage);
        }
      );
    }
  }
  
  rent_price_fun(){
    // this.form.Minimum=1;
    // this.form.Maximum=500000;
    this.searchForm.value.sliderControl[0] = 5000;
    this.searchForm.value.sliderControl[1] = 500000;
    this.searchForm.controls['search_type'].setValue('rent');
    this.rent_range_slider=true;
    this.buyyer_range_slider=false;
  }
  buyyer_price_fun(){
    // this.form.Minimum=500000;
    // this.form.Maximum=50000000;
    this.searchForm.value.sliderControl[0] = 500000;
    this.searchForm.value.sliderControl[1] = 50000000;
    this.searchForm.controls['search_type'].setValue('sales');
    this.rent_range_slider=false;
    this.buyyer_range_slider=true;
  }
  // Property_type_data(): void{
  //   this.userService.get_property_type().pipe().subscribe(
  //     (data: any) => {
  //        //console.log(data);
  //       this.property_type_data = data.data;
  //       this.property_type_result = this.property_type;
  //       this.property_type_count=data.count;
  //       //console.log(this.property_type_count);
  //       //console.log(this.property_type_data);
  //       //console.log(this.content);
  //     },
  //     err => {
  //       this.content = JSON.parse(err.error).message;
  //     }
  //   );
  // }

}
