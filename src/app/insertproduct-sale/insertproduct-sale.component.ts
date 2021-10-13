import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Options, LabelType } from 'ng5-slider';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { Validators } from '@angular/forms';
import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { InternalUserService } from './../_services/internal-user.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-insertproduct-sale',
  templateUrl: './insertproduct-sale.component.html',
  styleUrls: ['./insertproduct-sale.component.css']
})
export class InsertproductSaleComponent implements OnInit {

  private subs = new Subscription();
  [x: string]: any;
  form: any = {};
  ared: any = {};
  isLoggedIn = false;
  isFormSubmitted = false;
  public errorMessage: any = {};
  roles: string[] = [];
  public showLoadingIndicator: boolean = false;
  saleValue: boolean = true;
  rentValue: boolean = false;
  furnish: boolean = false;
  maintenance: boolean = true;
  parking_row: boolean = false;
  amenityArray = [];
  amenityArray_length:number=0;
  additional_room_array=[];
  varAmenity: string;
  public step: any = 1;

  furnishingArray = [];
  varfurnishing: string;

  text: string;

  content: any = {};
  user_id: any = {};
  public draft_form_id:any;

  err_caused: boolean = false;
  selectedItems: string[];
  selected_room: string[];

  amenitiesresult: () => void;
  Message: any = {};
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
  additional_rooms: [];
  additional_rooms_status: any;
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
  negotiable_status: any;
  facing_towards: any;
  availability_condition: any;
  buildyear: any;
  age_of_property: any;
  description: any;
  nearby_places: any;
  addtional_room: any = []
  features: any;
  i: any;
  public property_type: any;
  public property_type_result: any;
  product_img: any = [];
  public submitted: boolean = false;
  public Expected_PriceEroor: boolean = false;
  public Add_room_tab: boolean = false;
  public furnish_row: boolean = false;
  public price_negotiable_row: boolean = false;
  public maintenance_row: boolean = false;

  dropdownSettings: IDropdownSettings;
  dropdownList = [];

  public response: any;
  filteredOptions: Observable<any[]>;

  insert_property_sales = new FormGroup({
    Property_Details: new FormGroup({
      build_name: new FormControl(''),
      type: new FormControl(''),
      // display_address: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      draft_form_id: new FormControl(''),
      area_unit: new FormControl('', Validators.required),
      property_detail: new FormControl('', Validators.required),
    }),

    Property_Location: new FormGroup({
      address: new FormControl('', Validators.required),
      map_latitude: new FormControl('', Validators.required),
      map_longitude: new FormControl('', Validators.required),
      city: new FormControl('Delhi', Validators.required),
      locality: new FormControl(''),
      nearest_landmark: new FormControl('', Validators.required),
      pincode: new FormControl('')
    }),

    Property_additional_details: new FormGroup({
      bedroom: new FormControl('', Validators.required),
      bathroom: new FormControl('', Validators.required),
      balconies: new FormControl('', Validators.required),
      additional_rooms_status: new FormControl('0'),
      additional_rooms: new FormControl(''),
      furnishings: new FormControl(''),
      furnishing_status: new FormControl('NFR'),
      facing_towards: new FormControl('', Validators.required),
      rera_registration_status: new FormControl('', Validators.required),
      additional_parking_status: new FormControl('0'),
      buildyear: new FormControl(''),
      availability_condition: new FormControl(''),
      possession_by: new FormControl('' ),
      property_on_floor: new FormControl(''),
      total_floors: new FormControl(''),
      parking_covered_count: new FormControl(''),
      parking_open_count: new FormControl('')
    }),

    Property_price_images: new FormGroup({
      ownership: new FormControl('', Validators.required),
      expected_pricing: new FormControl('500001', Validators.required),
      // security_deposit: new FormControl('', Validators.required),
      inc_electricity_and_water_bill: new FormControl(''),
      tax_govt_charge: new FormControl('', Validators.required),
      price_negotiable: new FormControl(''),
      negotiable_status: new FormControl('0'),
      maintenance_charge_status: new FormControl('0'),
      // month_of_notice: new FormControl(''),
      maintenance_charge: new FormControl(''),
      // inclusive_pricing_details: new FormControl(''),
      // brokerage_charges: new FormControl(''),
      video_link: new FormControl('')
    }),
    /*Property_descption: new FormGroup({
      description: new FormControl('', Validators.required)
    })*/

  });

  // map google
  geoCoder: any;
  // searchElementRef:any;
  latCus = 78.89;
  longCus = 76.897;
  @ViewChild("search") searchElementRef: ElementRef;
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  zoom: number;
  location: string;
  nativeElement: any;


  // value: number = 30000000;
  options: Options = {
    floor: 500000,
    ceil: 50000000,
    // step: 10000,
    translate: (value: number, label: LabelType): string => {
      return '₹' + value.toLocaleString('en');
    }
  };

  constructor(private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private userService: UserService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private internalUserService: InternalUserService) {
    this.getLocation();
  }

  eventListen(event) {
    //console.log(event);
  }
  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.expected_pricing = 500001;

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });
    this.mapsAPILoader.load().then(() => {
      //console.log(this.searchElementRef);
      let autocomplete = new google.maps.places.Autocomplete(

        this.searchElementRef.nativeElement
      );
      // console.log(this.searchElementRef);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.latCus = place.geometry.location.lat();
          this.longCus = place.geometry.location.lng();
          this.location = place.formatted_address;
          this.zoom = 15;
          //console.log(this.latCus);
          //console.log(this.location);
          this.insert_property_sales.controls.Property_Location.patchValue({
            address: this.location,
            map_latitude: this.latCus,
            map_longitude: this.longCus,
          });

        });
      });
    });


    this.amenities();
    this.Property_type_data();
    this.get_area();
    this.titleService.setTitle('Create Listing');
    this.filteredOptions = this.Property_Location.locality.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    // Login check

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      if (this.tokenStorage.getUser().misc) {
        console.log(this.tokenStorage.getUser());
        this.user_id = this.tokenStorage.getUser().id;
      }
      else {
        console.log(this.tokenStorage.getUser());
        this.userDetails = JSON.parse(this.tokenStorage.getUser());
        this.user_id = this.userDetails.id;
      }
      //this.user_id = this.tokenStorage.getUser().id;
      this.maintenance = true;
      this.parking = false;
      this.roles = this.tokenStorage.getUser().username;
    }
    else {
      this.isLoggedIn = false;
      this.redirect_to_home();
    }

    this.selectedItems = new Array<string>();
    this.product_img = new Array<string>();
    this.selected_room = new Array<string>();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      maxHeight: 250
    };

  }

  redirect_to_home(): void {
    window.location.href = GlobalConstants.siteURL = "login"
  }
  getLocation() {
    this.showLoadingIndicator = true;
    this.userService.getLocationService().then(resp => {
      this.longCus = resp.lng;
      this.latCus = resp.lat;
      this.insert_property_sales.controls.Property_Location.patchValue({
        map_latitude: this.latCus,
        map_longitude: this.longCus,
      });
      this.showLoadingIndicator = false;
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
          this.insert_property_sales.controls.Property_Location.patchValue({
            address: results[0].formatted_address,
            map_latitude: this.latCus,
            map_longitude: this.longCus,
          });
        } else {
          //console.log('No results found');
        }
      } else {
        //console.log('Geocoder failed due to: ' + status);
      }

    });
  }

  get_area(): void {
    this.showLoadingIndicator = true;
    this.subs.add(this.internalUserService.get_areas().subscribe(
      data => {
        // this.dropdownList = data;
        for (let i = 1; i < data.length; i++) {
          this.dropdownList = this.dropdownList.concat({ item_id: data[i].id, item_text: data[i].area, item_pincode: data[i].pincode });
        }
        this.filteredOptions = this.Property_Location.locality.valueChanges
        .pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      },
      err => {
        console.log(err);
        this.showLoadingIndicator = false;
      }
    ));
  }

  /*get_area(): void {
    this.showLoadingIndicator = true;
    this.internalUserService.get_areas().pipe(map(
      data => {
        // this.dropdownList = data;
        for (let i = 1; i < data.length; i++) {
          this.dropdownList = this.dropdownList.concat({ item_id: data[i].id, item_text: data[i].area, item_pincode: data[i].pincode });
        }
        console.log(this.dropdownList);
        this.showLoadingIndicator = false;
      },
      err => {
        console.log(err);
        this.showLoadingIndicator = false;
      })
    );
  }*/

  private _filter(value: any): string[] {
    console.log(value);
    if (value.item_text) {
      const filterValue = value.item_text.toLowerCase();
      console.log(filterValue);
      return this.dropdownList.filter(option => option.item_text.toLowerCase().includes(filterValue));
    }
    else {
      const filterValue = value.toLowerCase();
      console.log(filterValue);
      return this.dropdownList.filter(option => option.item_text.toLowerCase().includes(filterValue));
    }


  }
  /*let newList = [];
  
  this.dropdownList.forEach(element => {
    if (element.item_text.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
      newList.push({'item_id': element.item_id, 'item_text': element.item_text });
    }
  })
  return newList;*/

  displayFn(value?) {
    console.log(this.dropdownList);
    return value ? this.dropdownList.find(option => option.item_id === value.item_id).item_text : undefined;
  }

  onchange_locality(id: any) {
    console.log(id);
    this.authService.get_pincodebyid(id.option.value.item_id).subscribe(
      data => {
        this.insert_property_sales.controls.Property_Location.patchValue({
          pincode: data.data.pincode,
        });
      },
      err => {
        // console.log(err);

      }
    );
  }


  amenities(): void {
    this.showLoadingIndicator = true;
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
  onchange_rooms(e: any, id: string) {
    if (e.target.checked) {
      this.selected_room.push(id);
    } else {
      this.selected_room = this.selected_room.filter(m => m != id);
    }
    this.additional_room_array = this.selected_room;
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
    this.amenityArray_length= this.amenityArray.length;
    console.log(this.amenityArray);
    console.log(this.amenityArray_length);

  }
  demo():void{
    console.log(this.insert_property_sales.value.Property_additional_details.furnishing_status);
    if(this.insert_property_sales.value.Property_additional_details.furnishing_status =='FFR'){
      console.log(this.amenityArray_length);
      if (this.amenityArray_length == 0){
        if (this.insert_property_sales.invalid) {
          // console.log(this.insert_property_sales.value);
          return;
        }
      }
    }
  }
  onchange_add_room(event:any){
    if(event==1){
      this.Add_room_tab=true;
    }else{
      this.Add_room_tab=false;
    }
  }
  furnishStatus(event): void {
    if (event == 'FFR') {
      this.furnish_row = true;
    }
    else {
      this.furnish_row = false;
    }
  }
  parkingStatus(event): void {
    if (event == 1) {
      this.parking_row = true;
    }
    else {
      this.parking_row = false;
    }
  }
  price_negotiable_status(event): void {
    if (event == 1) {
      this.price_negotiable_row = true;
    }
    else {
      this.price_negotiable_row = false;
    }
  }

  maintenanceStatus(event): void {
    if (event == 1) {
      this.maintenance_row = true;
    }
    else {
      this.maintenance_row = false;
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

  furnishing(event): void {
    //console.log(event)
    this.furnishingArray.push(event);

    //console.log(this.furnishingArray);
  }

  insert_image1(event) {
    //console.log(event.target.files.length);
    if (event.target.files.length <= 5) {
      for (let i = 0; i < event.target.files.length; i++) {
        //console.log("i: " + i);
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

  Property_type_data(): void {
    this.showLoadingIndicator = true;
    this.userService.get_property_type().pipe().subscribe(
      (data: any) => {
        //  console.log(amenitiesdata);
        this.property_type = data.data;
        this.property_type_result = this.property_type;
        this.showLoadingIndicator = false;
        //console.log(this.property_type_result);
        //console.log(this.content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.showLoadingIndicator = false;
      }
    );
  }

  Previous(): void {
    if (this.step > 1) {
      this.step = this.step - 1;
    } else {
      //console.log("step 1");
      this.step = 1;
    }
  }

  // controls checker
  get Property_Details() {
    // console.log(this.insert_property_sales.controls['Property_Details']['controls']);
    return this.insert_property_sales.controls['Property_Details']['controls'];
  }
  get Property_Location() {
    // console.log(this.insert_property_sales.controls['Property_Location']['controls']);
    return this.insert_property_sales.controls['Property_Location']['controls'];
  }
  get Property_area() {
    // console.log(this.insert_property_sales.controls['Property_area']['controls']);
    return this.insert_property_sales.controls['Property_additional_details']['controls'];
  }

  get Property_Pricing() {
    // console.log(this.insert_property_sales.controls['Property_Pricing']['controls']);
    return this.insert_property_sales.controls['Property_price_images']['controls'];
  }
  /*get Property_descption() {
    // console.log(this.insert_property_sales.controls['Property_descption']['controls']);
    return this.insert_property_sales.controls['Property_descption']['controls'];
  }*/

  onSubmitSale(): void {
    if (this.insert_property_sales.invalid) {
      // console.log(this.insert_property_sales.value);
      return;
    }
    this.showLoadingIndicator = true;
    if (this.insert_property_sales.value.Property_price_images.expected_pricing >= 500000 && this.insert_property_sales.value.Property_price_images.expected_pricing <= 50000000) {
      this.authService.product_insert_sale(this.insert_property_sales.value, this.user_id, this.additional_room_array, this.amenityArray, this.product_img).subscribe(
        data => {
          this.Message = data.message;
          this.showLoadingIndicator = false;
          this.toastr.success('Successfuly Saved', 'Property Sales');
          window.location.href = GlobalConstants.siteURL + "myproperties"
        },
        err => {
          this.showLoadingIndicator = false;
          this.err_caused = true;
          this.errorMessage = err.error.errors;
          this.errorMessage1 = err.error.message;
          // console.log(this.errorMessage);
          this.toastr.error(this.errorMessage1, 'Error', {
            timeOut: 3000,
          });
        }
      );
    } else {
      this.showLoadingIndicator = false;
      this.toastr.error("Expected Price Between 5Lakhs to 5 Crore", 'Price Invalid..!!', {
        timeOut: 2000,
      });
    }

  }
  saveDraft_form(): void {
    this.showLoadingIndicator = true;
    if (this.insert_property_sales.value.Property_price_images.expected_pricing >= 500000 && this.insert_property_sales.value.Property_price_images.expected_pricing <= 50000000) {
      this.authService.draft_insert_sale(this.insert_property_sales.value, this.user_id, this.additional_room_array, this.amenityArray, this.product_img).subscribe(
        data => {
          //  console.log(data.last_id);
          this.draft_form_id = data.last_id;
          this.insert_property_sales.controls.Property_Details.patchValue({
            draft_form_id: data.last_id,
          });
          this.Message = data.message;
          this.toastr.info(this.Message, 'Property Info Saved', {
            timeOut: 3000,
          });
          this.showLoadingIndicator = false;
          // window.location.href = GlobalConstants.siteURL + "myproperties"
        },
        err => {
          this.showLoadingIndicator = false;
          this.err_caused = true;
          this.errorMessage = err.error.errors;
          this.errorMessage1 = err.error.message;
          this.toastr.error(this.errorMessage1, 'Error', {
            timeOut: 3000,
          });
        }
      );
    } else {
      this.showLoadingIndicator = false;
      this.toastr.error("Expected Price Between 5Lakhs to 5 Crore", 'Price Invalid..!!', {
        timeOut: 2000,
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

  RangeSlider_Price(event: number) {
    // this.expected_pricing=500001;
    this.insert_property_sales.controls.Property_price_images.patchValue({
      expected_pricing: event,
    });
    if (event < 500000 || event > 50000000) {
      this.Expected_PriceEroor = true;
    } else {
      this.Expected_PriceEroor = false;
    }
  }
rangeInput_Price(event: number) {
    this.expected_pricing=event;
    if(event<500000 || event>50000000){
      this.Expected_PriceEroor=true;
    }else{
      this.Expected_PriceEroor=false;
    }
  }



  Expected_Price(event: number) {
    if (event > 500000 && event < 50000000) {
    } else {
      this.toastr.error("Expected Price Between 5Lakhs to 5 Crore", 'Price Invalid..!!', {
        timeOut: 1500,
      });
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

  crm_api_call() {
    this.controls = this.insert_property_sales.get('Property_Details');
    if (this.controls.valid) {
      console.log("Valid");
      console.log(this.controls);
      this.authService.crm_call(this.user_id).subscribe(
        data => {
          this.response = data;
        },
        err => {
          this.response = err;
        }
      );
    }
    else {
      console.log("Invalid");
    }

  }

}
