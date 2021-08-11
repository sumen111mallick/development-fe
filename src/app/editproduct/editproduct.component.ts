import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {


  form: any = {};
  ared: any = {};
  isLoggedIn = false;
  isFormSubmitted = false;
  errorMessage = '';
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

  text : string;

  content: any = {};

  err_caused:boolean = false;

  image1;
  image2;
  image3;
  image4;
  image5;





  ftpURL = GlobalConstants.ftpURL
  id;
  view_counter


  build_name
  type
  address
  display_address
  city
  locality
  property_detail
  nearest_landmark
  map_latitude
  map_longitude
  area
  carpet_area
  area_unit
  bedroom
  bathroom
  balconies
  additional_rooms
  equipment
  features
  nearby_places
  age_of_property
  furnishing_status
  property_on_floor
  total_floors
  facing_towards
  rera_registration_status;
  additional_parking_status;
  buildyear
  availability_condition
  possession_by
  amenities
  parking_covered_count
  parking_open_count
  furnishings
  ownership
  expected_pricing
  deposit
  inclusive_pricing_details
  tax_govt_charge
  price_negotiable
  maintenance_charge_status;
  brokerage_charges
  maintenance_charge_condition
  description

  rent_cond
  rent_availability
  sale_availability
  maintenance_charge
  available_for
  product_image1
  product_image2
  product_image3
  product_image4
  product_image5
  expected_rent
  inc_electricity_and_water_bill;
  security_deposit
  duration_of_rent_aggreement
  month_of_notice
  willing_to_rent_out_to
  agreement_type
  delete_flag





  constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService
    ) { }

    eventListen(event){
      console.log(event);
    }


  ngOnInit(): void {
    this.titleService.setTitle('Create Listing');
    // Login check
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true
      console.log(this.isLoggedIn)
    }
    else{
      this.redirect_to_home();
    }
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


    this.id = this.tokenStorage.getProduct();

      this.authService.product_see(this.id).subscribe(
        (data: any) => {
          this.content = data["product"]["0"]
          console.log(this.content.possession_by)

          this.form.build_name = this.content.build_name
          this.form.type = this.content.type
          this.form.address = this.content.address
          this.form.display_address = this.content.display_address
          this.form.city = this.content.city
          this.form.locality = this.content.locality
          this.form.property_detail = this.content.property_detail
          this.form.nearest_landmark = this.content.nearest_landmark
          this.form.map_latitude = this.content.map_latitude
          this.form.map_longitude = this.content.map_longitude
          this.form.area = this.content.area
          this.form.carpet_area = this.content.carpet_area
          this.form.area_unit = this.content.area_unit
          this.form.bedroom = this.content.bedroom
          this.form.bathroom = this.content.bathroom
          this.form.balconies = this.content.balconies
          this.form.additional_rooms = this.content.additional_rooms
          this.form.equipment = this.content.equipment
          this.form.features = this.content.features
          this.form.nearby_places = this.content.nearby_places
          this.form.age_of_property = this.content.age_of_property
          this.form.furnishing_status = this.content.furnishing_status
          this.form.property_on_floor = this.content.property_on_floor
          this.form.total_floors = this.content.total_floors
          this.form.facing_towards = this.content.facing_towards
          this.form.rera_registration_status = this.content.rera_registration_status
          this.form.additional_parking_status = this.content.additional_parking_status
          this.form.buildyear = this.content.buildyear
          this.form.availability_condition = this.content.availability_condition
          this.form.possession_by = this.content.possession_by

          this.form.parking_covered_count = this.content.parking_covered_count
          this.form.parking_open_count = this.content.parking_open_count
          this.furnishingArray = this.content.furnishings
          this.form.ownership = this.content.ownership
          this.form.expected_pricing = this.content.expected_pricing
          this.form.deposit = this.content.deposit
          this.form.inclusive_pricing_details = this.content.inclusive_pricing_details
          this.form.tax_govt_charge = this.content.tax_govt_charge
          this.form.price_negotiable = this.content.price_negotiable
          this.form.maintenance_charge_status = this.content.maintenance_charge_status
          this.form.brokerage_charges = this.content.brokerage_charges
          this.form.maintenance_charge_condition = this.content.maintenance_charge_condition
          this.form.description = this.content.description
          this.form.rent_cond = this.content.rent_cond
          this.form.rent_availability = this.content.rent_availability
          this.form.sale_availability = this.content.sale_availability
          this.form.maintenance_charge = this.content.maintenance_charge
          this.form.available_for = this.content.available_for
          this.form.product_image1 = this.content.product_image1
          this.form.product_image2 = this.content.product_image2
          this.form.product_image3 = this.content.product_image3
          this.form.product_image4 = this.content.product_image4
          this.form.product_image5 = this.content.product_image5
          this.form.expected_rent = this.content.expected_rent
          this.form.inc_electricity_and_water_bill = this.content.inc_electricity_and_water_bill
          this.form.security_deposit = this.content.security_deposit
          this.form.duration_of_rent_aggreement = this.content.duration_of_rent_aggreement
          this.form.month_of_notice = this.content.month_of_notice
          this.form.willing_to_rent_out_to = this.content.willing_to_rent_out_to
          this.form.agreement_type = this.content.agreement_type
          this.form.delete_flag = this.content.delete_flag
          this.form.view_counter = this.content.view_counter

          if(!this.content.parking_covered_count){this.form.parking_covered_count = 0}
          if(!this.content.parking_open_count){this.form.parking_open_count = 0}
          if(!this.content.willing_to_rent_out_to){this.form.willing_to_rent_out_to = 0}
          if(!this.content.duration_of_rent_aggreement){this.form.duration_of_rent_aggreement = 0}
          if(!this.content.month_of_notice){this.form.month_of_notice = 0}
          if(!this.content.agreement_type){this.form.agreement_type = 0}
          if(!this.content.available_for){this.form.available_for = 0}
          if(!this.content.expected_rent){this.form.expected_rent = 0}
          if(!this.content.inc_electricity_and_water_bill){this.form.inc_electricity_and_water_bill = 0}
          if(!this.content.rent_availability){this.form.rent_availability = 0}
          if(!this.content.rent_cond){this.form.rent_cond = 0}
          if(!this.content.security_deposit){this.form.security_deposit = 0}
          if(!this.content.brokerage_charges){this.form.brokerage_charges = 0}

          console.log(this.content.view_counter)

          if (this.additional_parking_status){
            this.parking = true;
          }
          else{
            this.parking = false
          }



        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      )


  }

  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
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

    this.readThis1(event.target)

  }
  readThis1(inputValue: any): void {
    var file:File = inputValue.files[0];
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
    var file:File = inputValue.files[0];
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
    var file:File = inputValue.files[0];
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
    var file:File = inputValue.files[0];
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
    var file:File = inputValue.files[0];
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
    if (event == 1){
      this.parking = true;
    }
    else{
      this.parking = false
    }
  }

  onSubmitSale(): void {

    console.log(this.form)
    this.authService.product_sale_update(this.id, this.form, this.content.furnishings,  this.content.amenities).subscribe(
      data => {
        console.log(data)
        window.location.reload();
      },
      err => {
        this.err_caused = true;
        this.errorMessage = err.error.errors;
        console.log(this.errorMessage);
      }
    );
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
