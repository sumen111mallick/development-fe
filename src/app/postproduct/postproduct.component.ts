import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
// import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Options,LabelType } from 'ng5-slider';
import { MapsAPILoader,AgmMap } from '@agm/core';
// import { google } from "google-maps";
import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-postproduct',
  templateUrl: './postproduct.component.html',
  styleUrls: ['./postproduct.component.css']
})
export class PostproductComponent implements OnInit {
  [x: string]: any;


  form: any = {};
  ared: any = {};
  isLoggedIn = false;
  isFormSubmitted = false;
  public errorMessage:any ={};
  roles: string[] = [];
  showLoadingIndicator :boolean= false;
  saleValue: boolean = true;
  rentValue: boolean = false;

  furnish: boolean = false;

  maintenance: boolean = true;

  parking: boolean = false;

  amenityArray = [];
  varAmenity: string;

  furnishingArray = [];
  varfurnishing: string;

  text : string;

  content: any = {};

  err_caused:boolean = false;
  selectedItems:string[];
  
  amenitiesresult: () => void;
  Message: any={};
  build_name: any;
  type: any;
  address: any;
  city: any;
  locality: any;
  property_detail: any;
  nearest_landmark: any;
  map_latitude: any;
  map_longitude: any;
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
  expected_pricing: any;
  possession_by: any;
  tax_govt_charge: any;
  price_negotiable: any;
  facing_towards: any;
  availability_condition: any;
  buildyear: any;
  age_of_property: any;
  description: any;
  nearby_places: any;
  equipment: any;
  features: any;
  i:any;

  // map google
  geoCoder:any;
  // searchElementRef:any;
  latCus=78.89;
  longCus=76.897;
  @ViewChild("search") searchElementRef: ElementRef;
  @ViewChild(AgmMap,{static: true}) public agmMap: AgmMap;
  zoom: number;
  location: string;

  // value: number = 30000000;
  options: Options = {
    floor: 0,
    ceil: 50000000
  };

   constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private userService: UserService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone:NgZone
    ) {
      
    this.getLocation();
     }

    eventListen(event){
      console.log(event);
    }


  ngOnInit(): void {
    console.log("1");
    this.showLoadingIndicator = true;
    this.form.expected_pricing="0";
    console.log("2");
    
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });
    console.log("3");
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
          this.form.address=this.location;
          this.form.map_latitude=this.latCus;
          this.form.map_longitude=this.longCus;
        
        });
      });
    });

    this.amenities();
    this.titleService.setTitle('Create Listing');
    // Login check
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true
      console.log(this.isLoggedIn)
    }
    else{
      this.redirect_to_home();
    }
    console.log(this.form);
    this.content = this.tokenStorage.getUser().id;
    this.maintenance = true;
    this.parking = false;
    if (this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().username;
    }
    else{
      this.isLoggedIn = false ;
    }
    this.selectedItems = new Array<string>();
  }

  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
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
  amenities(): void{
    this.userService.getamenitiesdata().pipe().subscribe(
      (amenitiesdata: any) => {
        //  console.log(amenitiesdata);
        this.amenities = amenitiesdata.data;
        this.amenitiesresult = this.amenities;
        console.log(this.amenitiesresult);
        //console.log(this.content);
        this.showLoadingIndicator = false;
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.showLoadingIndicator = false;
      }
    );
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

  furnishing(event): void{
    console.log(event)
    this.furnishingArray.push(event);

      console.log(this.furnishingArray);
  }





  insert_image1(event){
    if(event.target.files.length<=5){
        for(let i=0; i<=event.target.files.length;i++){
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
        this.toastr.error("Maximum 5 Images Selected", 'Image Upload Error!!!...', {
          timeOut: 1500,
        });
      }
  }
  readThis1(inputValue: any): void {
    var file:File = inputValue;
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image1 = myReader.result;
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
    }
    myReader.readAsDataURL(file);
  }
z

  delete_pic1(){
    this.image1 = null;
  }
  delete_pic2(){
    this.image2 = null;
  }
  delete_pic3(){
    this.image3 = null;
  }
  delete_pic4(){
    this.image4 = null;
  }
  delete_pic5(){
    this.image5 = null;
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

  onSubmitSale(): void {
    console.log(this.form);
    if(this.form.expected_pricing>=500000 && this.form.expected_pricing<=50000000){
    this.authService.product_insert_sale(this.form, this.content.id, this.amenityArray, this.furnishingArray, this.image1, this.image2, this.image3, this.image4, this.image5).subscribe(
      data => {
        console.log(data);
        this.toastr.success('Successfuly Saved', 'Property');
        window.location.href=GlobalConstants.siteURL+"myproperties"
      },
      err => {
        this.err_caused = true;
        this.errorMessage = err.error.errors;
        this.errorMessage1 = err.error.message;
        console.log(this.errorMessage);
        this.toastr.error(this.errorMessage1, 'Something Error', {
          timeOut: 3000,
        });
      }
    );
  }else{
    this.toastr.error("Expected Price Between 5Lakhs to 5 Crore", 'Price Invalid..!!', {
      timeOut: 2000,
    });
  }
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


}
