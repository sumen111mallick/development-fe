import { GlobalConstants } from './../global-constants';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader, AgmMap } from '@agm/core';
// import { google } from "google-maps";
import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-postproductrent',
  templateUrl: './postproductrent.component.html',
  styleUrls: ['./postproductrent.component.css']
})
export class PostproductrentComponent implements OnInit {

  showLoadingIndicator: boolean = false;
  form: any = {};
  ared: any = {};
  isLoggedIn = false;
  isFormSubmitted = false;
  public errorMessage: any = {};
  roles: string[] = [];

  saleValue: boolean = true;
  rentValue: boolean = false;

  furnish: boolean = false;

  maintenance: boolean = true;

  parking: boolean = false;

  amenityArray = [];
  varAmenity: string;

  furnishingArray = [];
  varfurnishing: string;

  text: string;

  err_caused: boolean = false;
  selectedItems: string[];

  content: any = {};

  image1;
  image2;
  image3;
  image4;
  image5;
  amenitiesresult: () => void;
  Message: any = {};
  build_name: any;
  type: any;
  willing_to_rent_out_to: any;
  agreement_type: any;
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
  parking_covered_count: any;
  expected_pricing: any;
  possession_by: any;
  tax_govt_charge: any;
  price_negotiable: any;
  facing_towards: any;
  availability_condition: any;
  buildyear: any;
  age_of_property: any;
  expected_rent: any;
  description: any;
  inc_electricity_and_water_bill: any;
  month_of_notice: any;
  duration_of_rent_aggreement: any;
  security_deposit: any;
  rent_availability: any;
  rent_cond: any;
  ownership: any;
  available_for: any;
  nearby_places: any;
  equipment: any;
  features: any;


  // value: number = 30000000;
  options: Options = {
    floor: 0,
    ceil: 50000000
  };
  i: any;
  geoCoder: any;
  // searchElementRef:any;
  latCus = 78.89;
  longCus = 76.897;
  @ViewChild("search") searchElementRef: ElementRef;
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  zoom: number;
  location: string;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private userService: UserService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {

    this.getLocation();
  }

  eventListen(event) {
    console.log(event);
  }


  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.form.expected_rent = "0";

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
          this.form.address = this.location;
          this.form.map_latitude = this.latCus;
          this.form.map_longitude = this.longCus;

        });
      });
    });
    this.amenities();
    this.titleService.setTitle('Create Listing');

    // Login check
    if (this.tokenStorage.getUser() != null) {
      this.isLoggedIn = true
      console.log(this.isLoggedIn)
    }
    else {
      this.redirect_to_home();
    }

    this.content = this.tokenStorage.getUser().id;
    console.log(this.content);
    this.maintenance = true;
    this.parking = false;
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().username;
    }
    else {
      this.isLoggedIn = false;
    }
    this.selectedItems = new Array<string>();
  }
  getLocation() {
    this.userService.getLocationService().then(resp => {
      console.log(resp.lng);
      console.log(resp);
      this.longCus = resp.lng;
      this.latCus = resp.lat;
      this.form.map_latitude = this.latCus;
      this.form.map_longitude = this.longCus;
    })
  }

  redirect_to_home(): void {
    window.location.href = GlobalConstants.siteURL = "login"
  }


  furnishStatus(event): void {
    console.log(event);
    if (event == 'SFR' || event == 'FFR') {
      this.furnish = true;
    }
    else {
      this.furnish = false;
    }
  }


  onChange(UpdatedValue: string): void {
    this.text = UpdatedValue;
    this.amenityArray.push(UpdatedValue);
  }

  amenity(event): void {
    console.log(event)
    this.amenityArray.push(event);

    console.log(this.amenityArray);
  }
  onchangeAmenties(e: any, id: string) {
    if (e.target.checked) {
      console.log(id + 'Checked');
      this.selectedItems.push(id);
    } else {
      console.log(id + 'UNChecked');
      this.selectedItems = this.selectedItems.filter(m => m != id);
    }
    this.amenityArray = this.selectedItems;
    console.log(this.amenityArray);

  }

  furnishing(event): void {
    console.log(event)
    this.furnishingArray.push(event);

    console.log(this.furnishingArray);
  }





  insert_image1(event) {
    if (event.target.files.length <= 5) {
      for (let i = 0; i <= event.target.files.length; i++) {
        if (i == 0) {
          this.readThis1(event.target.files[0]);
        }
        if (i == 1) {
          this.readThis2(event.target.files[1]);
        }
        if (i == 2) {
          this.readThis3(event.target.files[2]);
        }
        if (i == 3) {
          this.readThis4(event.target.files[3]);
        }
        if (i == 4) {
          this.readThis5(event.target.files[4]);
        }
      }
    } else {
      this.toastr.error("Maximum 5 Images Selected", 'Image Upload Error!!!...', {
        timeOut: 1500,
      });
    }


  }

  readThis1(inputValue: any): void {
    var file: File = inputValue;
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image1 = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  insert_image2(event) {

    this.readThis2(event.target)

  }
  readThis2(inputValue: any): void {
    var file: File = inputValue;
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image2 = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
  insert_image3(event) {

    this.readThis3(event.target)

  }
  readThis3(inputValue: any): void {
    var file: File = inputValue;
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image3 = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
  insert_image4(event) {

    this.readThis4(event.target)

  }
  readThis4(inputValue: any): void {
    var file: File = inputValue;
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image4 = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
  insert_image5(event) {

    this.readThis5(event.target)

  }
  readThis5(inputValue: any): void {
    var file: File = inputValue;
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image5 = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
  z

  delete_pic1() {
    this.image1 = null;
  }
  delete_pic2() {
    this.image2 = null;
  }
  delete_pic3() {
    this.image3 = null;
  }
  delete_pic4() {
    this.image4 = null;
  }
  delete_pic5() {
    this.image5 = null;
  }


  maintenanceStatus(event): void {
    if (event == 0) {
      this.maintenance = true;
    }
    else {
      this.maintenance = false
    }
  }

  parkingStatus(event): void {
    console.log(event)
    if (event == 0) {
      this.parking = true;
    }
    else {
      this.parking = false
    }
  }


  amenities(): void {
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

  onSubmitRent(): void {
    console.log(this.form);
    if (this.form.expected_rent >= 5000 && this.form.expected_rent <= 500000) {
      this.authService.product_insert_rent(this.form, this.content, this.amenityArray, this.furnishingArray, this.image1, this.image2, this.image3, this.image4, this.image5).subscribe(
        data => {
          console.log("successful" + data)
          this.toastr.success('Successfuly Saved', 'Property');
          window.location.href = GlobalConstants.siteURL + "myproperties"
        },
        err => {
          this.err_caused = true;
          this.errorMessage = err.error.errors;
          this.Message = err.error.message;
          console.log(this.errorMessage);
          console.log(this.Message);
          this.toastr.error(this.Message, 'Something Error', {
            timeOut: 3000,
          });
        }
      );
    } else {
      this.toastr.error("Expected Price Between 5k to 5 5Lakhs", 'Price Invalid..!!', {
        timeOut: 2000,
      }
      );
    }
  }

  saleButton(): void {
    this.saleValue = true;
    this.rentValue = false;
  }

  rentButton(): void {
    this.saleValue = false;
    this.rentValue = true;
  }

  reloadPage(): void {
    window.location.reload();
  }


}
