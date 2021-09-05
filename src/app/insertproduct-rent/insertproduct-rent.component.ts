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
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-insertproduct-rent',
  templateUrl: './insertproduct-rent.component.html',
  styleUrls: ['./insertproduct-rent.component.css']
})
export class InsertproductRentComponent implements OnInit {

  showLoadingIndicator: boolean = false;
  form: any = {};
  ared: any = {};
  isLoggedIn = false;
  isFormSubmitted = false;
  public errorMessage: any = {};
  roles: string[] = [];
  public submitted: boolean = false;

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

  public property_type: any;
  public property_type_result: any;
  product_img: any = [];
  public step: any = 1;
  public Expected_PriceEroor: boolean = false;

  insert_property_rent = new FormGroup({
    Property_Details: new FormGroup({
      build_name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      display_address: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      carpet_area: new FormControl('', Validators.required),
      area_unit: new FormControl('', Validators.required),
      bedroom: new FormControl('', Validators.required),
      bathroom: new FormControl('', Validators.required),
      balconies: new FormControl('', Validators.required),
      property_detail: new FormControl('', Validators.required)
    }),

    Property_address: new FormGroup({
      address: new FormControl('', Validators.required),
      map_latitude: new FormControl('', Validators.required),
      map_longitude: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      locality: new FormControl('', Validators.required),
      nearest_landmark: new FormControl('', Validators.required),
      nearby_places: new FormControl('', Validators.required)
    }),

    Property_additional_details: new FormGroup({
      additional_rooms: new FormControl('', Validators.required),
      equipment: new FormControl('', Validators.required),
      features: new FormControl('', Validators.required),
      age_of_property: new FormControl('', Validators.required),
      furnishings: new FormControl(''),
      furnishing_status: new FormControl('', Validators.required),
      facing_towards: new FormControl('', Validators.required),
      rera_registration_status: new FormControl('', Validators.required),
      additional_parking_status: new FormControl('', Validators.required),
      buildyear: new FormControl('', Validators.required),
      availability_condition: new FormControl('', Validators.required),
      possession_by: new FormControl('', Validators.required),
      property_on_floor: new FormControl('', Validators.required),
      total_floors: new FormControl('', Validators.required)
    }),

    Property_amenities_rent: new FormGroup({
      willing_to_rent_out_to: new FormControl('', Validators.required),
      agreement_type: new FormControl('', Validators.required),
      available_for: new FormControl('', Validators.required),
      rent_cond: new FormControl('', Validators.required),
      month_of_notice: new FormControl('', Validators.required),
      duration_of_rent_aggreement: new FormControl('', Validators.required),
      ownership: new FormControl('', Validators.required),
      parking_covered_count: new FormControl(''),
      parking_open_count: new FormControl('')
    }),

    Property_price_images: new FormGroup({
      expected_rent: new FormControl('5001', Validators.required),
      security_deposit: new FormControl('', Validators.required),
      inc_electricity_and_water_bill: new FormControl('', Validators.required),
      tax_govt_charge: new FormControl('', Validators.required),
      price_negotiable: new FormControl('', Validators.required),
      maintenance_charge_status: new FormControl('', Validators.required),
      brokerage_charges: new FormControl('')
    })

  });

  options: Options = {
     step:100,
    floor: 0,
    ceil: 500000,
    translate: (value: number, label: LabelType): string => {
      return '₹' + value.toLocaleString('en');
    }
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


  constructor(private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private userService: UserService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    this.getLocation();
  }

  eventListen(event) {
    //console.log(event);
  }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.expected_rent = 5001;

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
          //console.log(this.latCus);
          //console.log(this.location);
          this.insert_property_rent.controls.Property_address.patchValue({
            address: this.location,
            map_latitude: this.latCus,
            map_longitude: this.longCus,
          });

        });
      });
    });
    this.amenities();
    this.Property_type_data();
    this.titleService.setTitle('Create Listing');

    // Login check
   /* if (this.tokenStorage.getUser() != null) {
      this.isLoggedIn = true
      console.log(this.isLoggedIn)
    }
    else {
      this.redirect_to_home();
    } */

    this.content = this.tokenStorage.getUser().id;
    //console.log(this.content);
    this.maintenance = true;
    this.parking = false;

   /*if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().username;
    }
    else {
      this.isLoggedIn = false;
    } */
    this.selectedItems = new Array<string>();
    this.product_img = new Array<string>();
  }

  getLocation() {
    this.userService.getLocationService().then(resp => {
      //console.log(resp.lng);
      //console.log(resp);
      this.longCus = resp.lng;
      this.latCus = resp.lat;
      this.insert_property_rent.controls.Property_address.patchValue({
        map_latitude: this.latCus,
        map_longitude: this.longCus,
      });
    })
  }

  markerDragEnd($event: google.maps.MouseEvent) {
    this.latCus = $event.latLng.lat();
    this.longCus = $event.latLng.lng();
    this.form.map_latitude = this.latCus;
    this.form.map_longitude = this.longCus;
    this.geoCoder.geocode({ 'location': { lat: this.latCus, lng: this.longCus } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          //console.log(results[0].formatted_address);
          this.insert_property_rent.controls.Property_address.patchValue({
            address: results[0].formatted_address,
            map_latitude: this.latCus,
            map_longitude: this.longCus,
          });
        } else {
         // console.log('No results found');
        }
      } else {
        //console.log('Geocoder failed due to: ' + status);
      }

    });
  }

  redirect_to_home(): void {
    window.location.href = GlobalConstants.siteURL = "login"
  }


  furnishStatus(event): void {
    //console.log(event);
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
    //console.log(event)
    this.amenityArray.push(event);

    //console.log(this.amenityArray);
  }
  onchangeAmenties(e: any, id: string) {
    if (e.target.checked) {
     // console.log(id + 'Checked');
      this.selectedItems.push(id);
    } else {
      //console.log(id + 'UNChecked');
      this.selectedItems = this.selectedItems.filter(m => m != id);
    }
    this.amenityArray = this.selectedItems;
    //console.log(this.amenityArray);

  }

  furnishing(event): void {
    //console.log(event)
    this.furnishingArray.push(event);

    //console.log(this.furnishingArray);
  }

  insert_image1(event) {
    if (event.target.files.length <= 5) {
      for (let i = 0; i < event.target.files.length; i++) {
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
      if (this.image1 != null) {
        this.product_img.push(this.image1);
      }
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
      if (this.image2 != null) {
        this.product_img.push(this.image2);
      }
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
      if (this.image3 != null) {
        this.product_img.push(this.image3);
      }
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
      if (this.image4 != null) {
        this.product_img.push(this.image4);
      }
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
      if (this.image5 != null) {
        this.product_img.push(this.image5);
      }
    }
    myReader.readAsDataURL(file);
  }

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
    //console.log(event)
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
        //console.log(this.amenitiesresult);
        //console.log(this.content);
        this.showLoadingIndicator = false;
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.showLoadingIndicator = false;
      }
    );
  }

  Property_type_data(): void {
    this.userService.get_property_type().pipe().subscribe(
      (data: any) => {
        this.property_type = data.data;
        this.property_type_result = this.property_type;
        //console.log(this.property_type_result);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  // controls checker
  get Property_Details() {
    // console.log(this.insert_property_sales.controls['Property_Details']['controls']);
    return this.insert_property_rent.controls['Property_Details']['controls'];
  }
  get Property_address() {
    // console.log(this.insert_property_sales.controls['Property_Location']['controls']);
    return this.insert_property_rent.controls['Property_address']['controls'];
  }
  get Property_additional_details() {
    // console.log(this.insert_property_sales.controls['Property_area']['controls']);
    return this.insert_property_rent.controls['Property_additional_details']['controls'];
  }

  get Property_amenities_rent() {
    // console.log(this.insert_property_sales.controls['Property_Pricing']['controls']);
    return this.insert_property_rent.controls['Property_amenities_rent']['controls'];
  }
  get Property_price_images() {
    // console.log(this.insert_property_sales.controls['Property_parking']['controls']);
    return this.insert_property_rent.controls['Property_price_images']['controls'];
  }

  onSubmitRent(): void {
    //console.log(this.insert_property_rent.value);
    if (this.insert_property_rent.invalid) {
      //this.showLoadingIndicator = false;
      return;
    }
    if (this.insert_property_rent.value.Property_price_images.expected_rent >= 5000 && this.insert_property_rent.value.Property_price_images.expected_rent <= 500000) {
      this.authService.product_insert_rent(this.insert_property_rent.value, this.content, this.amenityArray, this.furnishingArray, this.product_img).subscribe(
        data => {
          //console.log("successful" + data)
          this.toastr.success('Successfuly Saved', 'Property');
          window.location.href = GlobalConstants.siteURL + "myproperties"
        },
        err => {
          this.err_caused = true;
          this.errorMessage = err.error.errors;
          this.Message = err.error.message;
          //console.log(this.errorMessage);
          //console.log(this.Message);
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

  RangeSlider_Price(event: number) {
    // this.expected_pricing=500001;
    this.insert_property_rent.controls.Property_price_images.patchValue({
      expected_rent: event,
    });
    if (event <= 5000 || event >= 500000) {
      this.Expected_PriceEroor = true;
    } else {
      this.Expected_PriceEroor = false;
    }
  }

  rangeInput_Price(event: number) {
    // this.expected_pricing=500001;
    this.insert_property_rent.controls.Property_price_images.patchValue({
      expected_rent: event,
    });
    if (event <= 5000 || event >= 500000) {
      this.Expected_PriceEroor = true;
    } else {
      this.Expected_PriceEroor = false;
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
