import { HttpParams } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { UserService } from './../_services/user.service';
import { GlobalConstants } from './../global-constants';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { Options,LabelType } from 'ng5-slider';
import { FormBuilder } from '@angular/forms';
import { MapsAPILoader,AgmMap } from '@agm/core';
// import { google } from "google-maps";
import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-updateproperty',
  templateUrl: './updateproperty.component.html',
  styleUrls: ['./updateproperty.component.css']
})
export class UpdatepropertyComponent implements OnInit {

  selectedId:number;
 
  ftpstring: string = GlobalConstants.ftpURL;
  usertype;
  id;
  data_id:number=null;
  
  image1: string | ArrayBuffer;
  image2: string | ArrayBuffer;
  image3: string | ArrayBuffer;
  image4: string | ArrayBuffer;
  image5: string | ArrayBuffer;
  
  product_img_length:number=0;
  amenitiesresult: () => void;
  errorMessage1: any;
  build_name: any;
  type: any;
  willing_to_rent_out_to:any;
  agreement_type:any;
  address: any;
  city: any;
  locality: any;
  property_detail: any;
  nearest_landmark: any;
  map_latitude: any;
  map_longitude: any;

  files_length: number;
  display_address: any;
  area: any;
  area_unit: any;
  carpet_area: any;
  bedroom: any;
  bathroom: any;
  balconies: any;
  additional_rooms: any;
  furnishing_status: any;
  furnishings: any;
  total_floors: any;
  property_on_floor: any;
  rera_registration_status: any;
  additional_parking_status: any;
  parking_covered_count:any;
  expected_pricing: any;
  possession_by: any;
  tax_govt_charge: any;
  price_negotiable: any;
  facing_towards: any;
  availability_condition: any;
  buildyear: any;
  age_of_property: any;
  expected_rent:any;
  description: any;
  inc_electricity_and_water_bill:any;
  month_of_notice:any;
  duration_of_rent_aggreement:any;
  security_deposit:any;
  rent_availability:any;
  rent_cond:any;
  ownership:any;
  available_for:any;
  nearby_places: any;
  equipment: any;
  features: any;
   userEmail: any;
   userProfile: any;
   form: any = {};
   ared: any = {};
   isLoggedIn = false;
   isFormSubmitted = false;
   public isLoaded:boolean = true;
   public isLoaded1 :any={};
   public errorMessage:any ={};
   Message: any={};
   roles: string[] = [];
   saleValue: boolean = true;
   rentValue: boolean = false;
   furnish: boolean = false;
   maintenance: boolean = true;
   parking: boolean = false;
   product_img:any={};
   amenityArray = [];
   amenity_Uncheck=[];
   varAmenity: string;
   furnishingArray = [];
   varfurnishing: string;
   text : string;url:any;
   err_caused: boolean = false;
   selectedItems:string[];
   Uncheck_Items:string[];
   content: any = {};
  product_amenties: any;
  public property_type:any;
  public property_type_result:any;
  


  PropertyUpdate = this.fb.group({
    build_name: ['', Validators.required],
    type: ['', Validators.required],
    willing_to_rent_out_to: ['', Validators.required],
    agreement_type:  ['', Validators.required],
    address:  ['', Validators.required],
    city:  ['', Validators.required],
    locality:  ['', Validators.required],
    property_detail:  ['', Validators.required],
    nearest_landmark:  ['', Validators.required],
    map_latitude:  ['', Validators.required],
    map_longitude:  ['', Validators.required],
    display_address:  ['', Validators.required],
    area:  ['', Validators.required],
    area_unit:  ['', Validators.required],
    carpet_area:  ['', Validators.required],
    bedroom:  ['', Validators.required],
    bathroom:  ['', Validators.required],
    balconies:  ['', Validators.required],
    additional_rooms:  ['', Validators.required],
    furnishing_status:  ['', Validators.required],
    furnishings:  ['', Validators.required],
    total_floors:  ['', Validators.required],
    property_on_floor:  ['', Validators.required],
    rera_registration_status:  ['', Validators.required],
    additional_parking_status:  ['', Validators.required],
    parking_covered_count:  ['', Validators.required],
    expected_pricing:  ['', Validators.required],
    possession_by:  ['', Validators.required],
    tax_govt_charge:  ['', Validators.required],
    price_negotiable:  ['', Validators.required],
    facing_towards:  ['', Validators.required],
    availability_condition:  ['', Validators.required],
    buildyear:  ['', Validators.required],
    age_of_property:  ['', Validators.required],
    expected_rent:  ['', Validators.required],
    description:  ['', Validators.required],
    inc_electricity_and_water_bill:  ['', Validators.required],
    month_of_notice:  ['', Validators.required],
    duration_of_rent_aggreement:  ['', Validators.required],
    security_deposit:  ['', Validators.required],
    rent_cond:  ['', Validators.required],
    ownership:  ['', Validators.required],
    available_for:  ['', Validators.required],
    nearby_places:  ['', Validators.required],
    equipment:  ['', Validators.required],
    features:  ['', Validators.required],
    maintenance_charge:  ['', Validators.required],
    maintenance_charge_status:  ['', Validators.required],
    parking_open_count:  ['', Validators.required]
  });

  imagePre1: any;
  imagePre2: any;
  imagePre3: any;
  imagePre4: any;
  imagePre5: any;
 
  maintenance_charge: any;
  maintenance_charge_status: any;
  parking_open_count: any;
  Amenties_id: any;
  Amenties_length: number;
  product_amenties_length:number=null;
  p_images:number=5;
  showLoadingIndicator: boolean;
  Expected_PriceEroor:boolean= false;
  update_product_img:string[];
  geoCoder:any;
  // searchElementRef:any;
  latCus:any;
  longCus:any;
  @ViewChild("search") searchElementRef: ElementRef;
  @ViewChild(AgmMap,{static: true}) public agmMap: AgmMap;
  zoom: number;
  location: string;

  options: Options = {
    // step:500,
    floor: 0,
    ceil: 500000
  };
 
 
   constructor(
    private fb: FormBuilder,
     private route: ActivatedRoute,
     private router: Router,
     private titleService: Title,
     private tokenStorage: TokenStorageService,
     private authService: AuthService,
     private userService: UserService,
     private toastr: ToastrService,
     private mapsAPILoader: MapsAPILoader,
     private ngZone:NgZone
     ) { 
      this.route.params.subscribe((params) => {
        this.id = params["id"];
     });
     this.getLocation();
     }

     get f() {
      return this.PropertyUpdate.controls;
    }


   ngOnInit(): void {
     if (this.tokenStorage.getToken() != null){
       this.property_details(this.id);
       this.amenities();   
       this.Property_type_data();    
     }
     else{
       this.redirect_to_home();
     }
     
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
          console.log(this.latCus);
          console.log(this.location);
          this.PropertyUpdate.patchValue({
            address:this.location,
            map_latitude:this.latCus,
            map_longitude:this.longCus,
            });
          this.form.map_latitude=this.latCus;
          this.form.map_longitude=this.longCus;
        
        });
      });
    });
    
     
    this.selectedItems = new Array<string>();
    this.Uncheck_Items = new Array<string>();
    this.update_product_img = new Array<string>();
   }

   getLocation(){
    this.userService.getLocationService().then(resp=>{
     console.log(resp.lng);
     console.log(resp); 
     this.longCus=resp.lng;
     this.latCus=resp.lat; 
     this.form.map_latitude=this.latCus;
     this.form.map_longitude=this.longCus;
     })
  }  

   markerDragEnd($event: google.maps.MouseEvent) {
    this.latCus = $event.latLng.lat(); 
    this.longCus = $event.latLng.lng();
   
    this.geoCoder.geocode({ 'location': { lat: this.latCus, lng: this.longCus } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          console.log(results[0].formatted_address);
          this.PropertyUpdate.patchValue({
            address:results[0].formatted_address,
            map_latitude:this.latCus,
            map_longitude:this.longCus,
            });
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
  
    });
    }
    

   property_details(p_id): void {
     console.log(p_id);
     this.id=p_id;
     this.showLoadingIndicator = true;
     this.authService.Propery_get_id(this.id).subscribe(
       (data: any) => {
        console.log(data);
        this.data_id=data.data.id;
         if( this.data_id == 0){
          this.redirect_to_myproperties();
         } 
        this.product_img=data.data.product_img;
        this.product_img_length=this.product_img.length;
        console.log(this.product_img);
        console.log(this.product_img_length);
         this.product_amenties=data.data.amenities;
         console.log(this.product_amenties);
         this.product_amenties_length= data.data.amenities.length;
         console.log(this.product_amenties_length);
         
         this.url=this.ftpstring;
         
        this.id=data.data.id;
         this.build_name = data.data.build_name;
         this.type = data.data.type;
         this.willing_to_rent_out_to = data.data.willing_to_rent_out_to;
         this.agreement_type = data.data.agreement_type;
         this.address = data.data.address;
         this.city = data.data.city;
         this.locality = data.data.locality;
         this.property_detail = data.data.property_detail;
         this.nearest_landmark = data.data.nearest_landmark;
         this.map_latitude = data.data.map_latitude;
         this.map_longitude = data.data.map_longitude;
         this.display_address = data.data.display_address;
         this.area = data.data.area;
         this.area_unit = data.data.area_unit;
         this.carpet_area = data.data.carpet_area;
         this.bedroom = data.data.bedroom;
         this.bathroom = data.data.bathroom;
         this.balconies = data.data.balconies;
         this.additional_rooms = data.data.additional_rooms;
         this.furnishing_status = data.data.furnishing_status;
         this.furnishings = data.data.furnishings;
         this.total_floors = data.data.total_floors;
         this.property_on_floor = data.data.property_on_floor;
         this.rera_registration_status = data.data.rera_registration_status;
         this.additional_parking_status = data.data.additional_parking_status;
         this.parking_covered_count = data.data.parking_covered_count;
         this.possession_by = data.data.possession_by;
         
         this.tax_govt_charge = data.data.tax_govt_charge;
         this.price_negotiable = data.data.price_negotiable;
         this.facing_towards = data.data.facing_towards;
         this.availability_condition = data.data.availability_condition;
         this.buildyear = data.data.buildyear;
         this.age_of_property = data.data.age_of_property;
         this.expected_rent = data.data.expected_rent;
         this.expected_pricing = data.data.expected_pricing;
         this.description = data.data.description;
         this.inc_electricity_and_water_bill = data.data.inc_electricity_and_water_bill;
         this.month_of_notice = data.data.month_of_notice;
         this.duration_of_rent_aggreement = data.data.duration_of_rent_aggreement;
         this.security_deposit = data.data.security_deposit;
         this.rent_availability = data.data.rent_availability;
         this.rent_cond = data.data.rent_cond;
         this.ownership = data.data.ownership;
         this.available_for = data.data.available_for;
         this.nearby_places = data.data.nearby_places;
         this.equipment = data.data.equipment;
         this.features = data.data.features;
         this.maintenance_charge=data.data.maintenance_charge,
         this.maintenance_charge_status=data.data.maintenance_charge_status;
         this.parking_open_count=data.data.parking_open_count;
 
         this.PropertyUpdate.patchValue({
          id:this.id,
          build_name: this.build_name,
          type:this.type,
          willing_to_rent_out_to: this.willing_to_rent_out_to ,
          agreement_type: this.agreement_type,
          address:this.address,
          city:this.city,
          locality:this.locality,
          property_detail:this.property_detail,
          nearest_landmark:this.nearest_landmark,
          map_latitude:this.map_latitude,
          map_longitude:this.map_longitude,
          display_address:this.display_address,
          area:this.area,
          area_unit:this.area_unit,
          carpet_area:this.carpet_area,
          bedroom:this.bedroom,
          bathroom:this.bathroom,
          balconies:this.balconies,
          additional_rooms:this.additional_rooms,
          furnishing_status:this.furnishing_status,
          furnishings:this.furnishings,
          total_floors:this.total_floors,
          property_on_floor:this.property_on_floor,
          rera_registration_status:this.rera_registration_status,
          additional_parking_status:this.additional_parking_status,
          parking_covered_count:this.parking_covered_count,
          parking_open_count:this.parking_open_count,
          expected_pricing:this.expected_pricing,
          possession_by:this.possession_by,
          tax_govt_charge:this.tax_govt_charge,
          price_negotiable:this.price_negotiable,
          facing_towards:this.facing_towards,
          availability_condition:this.availability_condition,
          buildyear:this.buildyear,
          age_of_property:this.age_of_property,
          expected_rent:this.expected_rent,
          description:this.description,
          inc_electricity_and_water_bill:this.inc_electricity_and_water_bill,
          month_of_notice:this.month_of_notice,
          duration_of_rent_aggreement:this.duration_of_rent_aggreement,
          security_deposit:this.security_deposit,
          rent_cond:this.rent_cond,
          ownership:this.ownership,
          available_for:this.available_for,
          nearby_places:this.nearby_places,
          equipment:this.equipment,
          features:this.features,
          maintenance_charge:this.maintenance_charge,
          maintenance_charge_status:this.maintenance_charge_status,
        });
        this.showLoadingIndicator = false; 
       } 
       );
     
   }

   furnishStatus(event): void{
     console.log(event);
     if(event == 'SFR' || event == 'FFR')
     {
       this.furnish = true;
     }
     else
     {
       this.furnish = false;
     }
   }
   price_nego_Change(event){
     console.log(event);
   }
   onChange(UpdatedValue : string) :void
   {
     this.text = UpdatedValue;
     this.amenityArray.push(UpdatedValue);
   }
 
   amenity(event): void{
     console.log(event)
     this.amenityArray.push(event);
 
       console.log(this.amenityArray);
   }
   onchangeAmenties(e:any,id:string){
    console.log(e.target.checked);
    if(e.target.checked){
      console.log(id + 'Checked');
      this.selectedItems.push(id);
      this.Uncheck_Items= this.Uncheck_Items.filter(m=>m!=id);
    }else{
      
      console.log(id + 'UNChecked');
      this.Uncheck_Items.push(id);
      this.selectedItems= this.selectedItems.filter(m=>m!=id);
    }
    this.amenityArray=this.selectedItems; 
    this.amenity_Uncheck=this.Uncheck_Items;
   console.log(this.amenity_Uncheck); 
   console.log(this.amenityArray);
  
  }
  
 
   furnishing(event): void{
     console.log(event)
     this.furnishingArray.push(event);
 
       console.log(this.furnishingArray);
   }

   insert_image1(event: { target: { files: string | any[]; }; }){
    this.files_length=this.p_images- this.product_img_length;
    if(event.target.files.length<=this.files_length){
      for(let i=0; i<=this.files_length;i++){
          if(i==0){
          this.readThis1(event.target.files[0]);
          }
          if(i==1){
            this.readThis2(event.target.files[1]);
          }
          if(i==2){
            this.readThis3(event.target.files[2]);
          }
          if(i==3){
            this.readThis4(event.target.files[3]);
          }    
          if(i==4){
            this.readThis5(event.target.files[4]);
          }
      }
    }else{
      this.toastr.error("Maximum ("+ this.files_length +") Images Selected", 'Image Upload Error!!!...', {
        timeOut: 1500,
      });
    }
  }
  

   readThis1(inputValue: any): void {
     var file:File = inputValue;
     var myReader:FileReader = new FileReader();
 
     myReader.onloadend = (e) => {
       this.image1 = myReader.result;
       this.imagePre1 =this.image1;
       if(this.imagePre1 != null){
        this.update_product_img.push(this.imagePre1);
      }
     }
     myReader.readAsDataURL(file);
   }
 
    insert_image2(event){
 
     this.readThis2(event.target)
 
   }
   readThis2(inputValue: any): void {
     var file:File = inputValue;
     var myReader:FileReader = new FileReader();
 
     myReader.onloadend = (e) => {
       this.image2 = myReader.result;
       this.imagePre2 =this.image2;
       if(this.imagePre2 != null){
        this.update_product_img.push(this.imagePre2);
      }
     }
     myReader.readAsDataURL(file);
   }
   insert_image3(event){
 
     this.readThis3(event.target)
 
   }
   readThis3(inputValue: any): void {
     var file:File = inputValue;
     var myReader:FileReader = new FileReader();
 
     myReader.onloadend = (e) => {
       this.image3 = myReader.result;
       this.imagePre3 =this.image3;
       if(this.imagePre3 != null){
        this.update_product_img.push(this.imagePre3);
      }
     }
     myReader.readAsDataURL(file);
   }
   insert_image4(event){
 
     this.readThis4(event.target)
 
   }
   readThis4(inputValue: any): void {
     var file:File = inputValue;
     var myReader:FileReader = new FileReader();
 
     myReader.onloadend = (e) => {
       this.image4 = myReader.result;
       this.imagePre4 =this.image4;
       if(this.imagePre4 != null){
        this.update_product_img.push(this.imagePre4);
      }
     }
     myReader.readAsDataURL(file);
   }
   insert_image5(event){
 
     this.readThis5(event.target)
 
   }
   readThis5(inputValue: any): void {
     var file:File = inputValue;
     var myReader:FileReader = new FileReader();
 
     myReader.onloadend = (e) => {
       this.image5 = myReader.result;
       this.imagePre5 =this.image5;
       if(this.imagePre5 != null){
        this.update_product_img.push(this.imagePre5);
      }
     }
     myReader.readAsDataURL(file);
   }
 
 
   delete_pic1(){
     this.imagePre1=null;
   }
   delete_pic2(){
     this.imagePre2=null;
   }
   delete_pic3(){
     this.imagePre3=null;
   }
   delete_pic4(){
     this.imagePre4=null;
   }
   delete_pic5(){
     this.imagePre5=null;
   }   
  
   maintenanceStatus(event): void {
     if (event == 0){
       this.maintenance = true;
     }
     else{
       this.maintenance = false
     }
   }
 
   parkingStatus(event): void {
     console.log(event)
     if (event == 0){
       this.parking = true;
     }
     else{
       this.parking = false
     }
   }
 
   Property_type_data(): void{
    this.userService.get_property_type().pipe().subscribe(
      (data: any) => {
        //  console.log(amenitiesdata);
        this.property_type = data.data;
        this.property_type_result = this.property_type;
        console.log(this.property_type_result);
        //console.log(this.content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  
   
   amenities(): void{
     this.userService.getamenitiesdata().pipe().subscribe(
       (amenitiesdata: any) => {
         //  console.log(amenitiesdata);
         this.amenities = amenitiesdata.data;
         this.amenitiesresult = this.amenities;
         this.Amenties_length=this.amenitiesresult.length;
         //console.log(this.content);
       },
       err => {
         this.content = JSON.parse(err.error).message;
       }
     );
   }

  Amenties_funtion(Amenties_id:any){
      // var len= this.product_amenties.length; 
    if(this.product_amenties_length !=null){
      for (let i = 0; i < this.product_amenties_length; i++) {
        if(Amenties_id==this.product_amenties[i].amenties){
          return  true;
        }
      }
    }
    return false;
  }
 
 
   saleButton(): void{
     this.saleValue = true;
     this.rentValue = false;
   }
 
   rentButton(): void{
     this.saleValue = false;
     this.rentValue = true;
   }
 
   reloadPage(): void {
     window.location.reload();
   }
   RangeSlider_Price(event){
    this.expected_pricing=event;
      this.PropertyUpdate.patchValue({
        expected_rent:this.expected_rent,
      });
      if(event<=5000 || event>=500000){
        this.Expected_PriceEroor=true;
      }else{
        this.Expected_PriceEroor=false;
      }
  }
  rangeInput_Price(event){
    this.expected_rent=event;
    if(event<=5000 || event>=500000){
      this.Expected_PriceEroor=true;
    }else{
      this.Expected_PriceEroor=false;
    }
  }
   
  Expected_RentPrice(event: number){
    if(event>=5000 && event<=500000){
    }else{
      this.toastr.error("Expected Price Between 5k to 5 Lakhs", 'Price Invalid..!!', {
        timeOut: 1500,
      });
    }
  }
  keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  
delete_Pro_img(id: any){
  this.authService.delete_pro_img(id).subscribe(
       data => {
         console.log(data);
       this.property_details(this.id);
       },
       err => {
         console.log(err)
       }
     );
 }

   onSubmitRent(): void {    
    if(this.PropertyUpdate.value.expected_rent>=5000 && this.PropertyUpdate.value.expected_rent<=500000){
      this.authService.product_rent_update(this.PropertyUpdate.value, this.id, this.amenityArray,this.amenity_Uncheck, this.furnishingArray, this.update_product_img).subscribe(
        data => {
          console.log("successful Updated" + data)
          this.toastr.success('Successfuly Updated', 'Property Rent');
          window.location.href=GlobalConstants.siteURL+"myproperties"
        },
        err => {
          this.err_caused = true;
          this.errorMessage = err.error.errors;
          this.Message = err.error.message;
          console.log(this.errorMessage);
          this.toastr.error(this.Message, 'Something Error', {
            timeOut: 3000,
          });
        }
      );
    }else{
      this.toastr.error("Expected Price Between  5k to 5 Lakhs", 'Price Invalid..!!', {
        timeOut: 2000,
      });
    }
     
   }

   redirect_to_myproperties(): void {
    window.location.href=GlobalConstants.siteURL="myproperties"
  }
  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
    }
  

}
