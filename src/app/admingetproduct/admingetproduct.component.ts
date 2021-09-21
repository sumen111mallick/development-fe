import { GlobalConstants } from './../global-constants';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admingetproduct',
  templateUrl: './admingetproduct.component.html',
  styleUrls: ['./admingetproduct.component.css']
})
export class AdmingetproductComponent implements OnInit {

  content
  ftpURL = GlobalConstants.ftpURL
  form: any = {};
  id;
  view_counter
  address
  city
  rent_cond
  rent_availability
  sale_availability
  possession_by
  locality
  display_address
  ownership
  expected_pricing
  inclusive_pricing_details
  tax_govt_charge
  price_negotiable
  maintenance_charge_status;
  maintenance_charge
  maintenance_charge_condition
  deposit
  available_for
  brokerage_charges
  type
  product_image1
  product_image2
  product_image3
  product_image4
  product_image5
  bedroom
  bathroom
  balconies
  additional_rooms
  furnishing_status
  furnishings
  total_floors
  property_on_floor
  rera_registration_status;
  amenities
  facing_towards
  additional_parking_status;
  description
  parking_covered_couing_covered_count
  parking_open_count
  availability_condition
  buildyear
  age_of_property
  expected_rent
  inc_electricity_and_water_bill;
  security_deposit
  duration_of_rent_aggreement
  month_of_notice
  equipment
  features
  nearby_places
  area
  area_unit
  carpet_area
  property_detail
  build_name
  willing_to_rent_outling_to_rent_out_to
  agreement_type
  nearest_landmark
  map_latitude
  map_longitude
  delete_flag

  prod_id
  public showLoadingIndicator: boolean =false;

  constructor(
    private titleservice: Title,
    private userService: UserService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.titleservice.setTitle('All Properties')
    this.userService.getAdmin_product().pipe().subscribe(
      data => {
        this.content = data.data
        //console.log(data.data)
        this.showLoadingIndicator = false;
      },
      err => {
        //console.log(err)
        this.showLoadingIndicator = false;
      }
    )

  }

  del_func(id){
    this.showLoadingIndicator = true;
    {this.authService.property_delete_admin(id).subscribe(

        data => {
          //console.log(data)
          this.showLoadingIndicator = false;
          window.location.reload();
        },
        err => {
          this.showLoadingIndicator = false;
          //console.log(err)
        }
      );
    }
  }

  onSubmitUpdate(): void {
    this.showLoadingIndicator = true;
    //console.log(this.form)
    this.authService.user_update(this.form, this.id).subscribe(
      data => {
        //console.log(data);
        this.showLoadingIndicator = false;
        window.location.reload();
      },
      err => {
        this.showLoadingIndicator = false;
        //console.log(err);
      }
    );
  }

  product_details(data): void {
    this.showLoadingIndicator = true;
    this.authService.product_see(data).subscribe(
      (data: any) => {
        this.content = data["product"]["0"]["id"]
        this.tokenStorage.setProduct(this.content)
        this.showLoadingIndicator = false;
        //console.log(this.tokenStorage.getProduct())

        this.redirect_to_edit();

      },
      err => {
        this.showLoadingIndicator = false;
        this.content = JSON.parse(err.error).message;
      }
    )
  }

  onShare(event){
    //window.location.href=GlobalConstants.siteURL+"productpage" + "?id=" + event
    window.location.href=GlobalConstants.siteURL+"productpage?id=" + event
    // alert("Your Shareable Link is \n" + this.sitestring + this.router.url + "?id=" + this.prod_id);
  }

  redirect_to_profile(): void {
    window.location.href=GlobalConstants.siteURL+"profile"
  }

  redirect_to_edit(): void {
    window.location.href=GlobalConstants.siteURL+"editproduct"
  }


}
