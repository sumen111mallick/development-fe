import { stringify } from '@angular/compiler/src/util';
import { TokenStorageService } from './token-storage.service';
import { GlobalConstants } from './../global-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

const AUTH_API = GlobalConstants.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  getIPAddress() {
    return this.http.get("http://api.ipify.org/?format=json");
  }
  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'auth/login', JSON.stringify({
      email: credentials.email,
      password: credentials.password,
      rememberme: 1
    }), httpOptions);
  }

  register(user, profile_pic): Observable<any> {
    return this.http.post(AUTH_API + 'auth/user_signup', ({
      name: user.username,
      email: user.email,
      profile_pic: profile_pic,
      other_mobile_number: user.other_mobile_number,
      password: user.password,
      password_confirmation: user.cpassword,
    }), httpOptions);
  }

  mobile_verify(data, id): Observable<any> {
    console.log("Mobile Verification");
    console.log(data, id);
    return this.http.post(AUTH_API + 'auth/verify_mobile', ({
      other_mobile_number: data,
      user_id: id
    }), httpOptions);
  }
  /* Code added by Radhika Start */

  register_new(user): Observable<any> {
    console.log(user);
    return this.http.post(AUTH_API + 'auth/user_signup_new', ({
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      other_mobile_number: user.other_mobile_number,
      password: user.password,
      password_confirmation: user.cpassword,
      selectType: user.select_type,
      agree_check: user.tnc_check
    }), httpOptions);
  }

  register_internal_user(internal_user): Observable<any> {
    console.log(internal_user);
    return this.http.post(AUTH_API + 'auth/internal_user_signup', ({
      user_name: internal_user.value.username,
      email: internal_user.value.email,
      other_mobile_number: internal_user.value.phone,
      address: internal_user.value.address1,
      address1: internal_user.value.address2,
      password: internal_user.value.password,
      branch: internal_user.value.branch,
      user_role: internal_user.value.user_role,
      area_name: internal_user.value.selectedItems
    }), httpOptions);
  }

  create_role(role_details): Observable<any> {
    console.log(role_details);
    return this.http.post(AUTH_API + 'auth/create_role', ({
      role: role_details.value.rolename,
      role_id: role_details.value.role_id,
      access_all_users: role_details.value.all_usersControl,
      access_properties: role_details.value.propertiesControl,
      access_blog: role_details.value.blogControl,
      //access_requirements: role_details.value.requirementsControl,
      access_reviews: role_details.value.reviewsControl,
      access_lawyer_services: role_details.value.lawyerControl,
      access_loan_control: role_details.value.loanControl,
      access_user_creator: role_details.value.user_creatorControl,
      access_roles: role_details.value.roleControl,
      access_list_property: role_details.value.listPropertyControl
    }), httpOptions);
  }

  update_role(updateRoleData, $id) {
    return this.http.post(AUTH_API + 'auth/roles/update/' + $id, updateRoleData);
  }

  /* Code added by Radhika End */
  register_owner(user, profile_pic): Observable<any> {
    return this.http.post(AUTH_API + 'auth/owner_signup', ({
      name: user.username,
      email: user.email,
      other_mobile_number: user.other_mobile_number,
      address: user.address,
      city: user.city,
      pan_number: user.pan_number,
      aadhar_number: user.aadhar_number,
      profile_pic: profile_pic,
      password: user.password,
      password_confirmation: user.cpassword,
    }), httpOptions);
  }

  register_dealer(user, profile_pic): Observable<any> {
    return this.http.post(AUTH_API + 'auth/dealer_signup', ({
      name: user.username,
      email: user.email,
      other_mobile_number: user.other_mobile_number,
      company_name: user.company_name,
      company_url: user.company_url,
      address: user.address,
      city: user.city,
      landline_number: user.landline_number,
      company_profile: user.company_profile,
      pan_number: user.pan_number,
      aadhar_number: user.aadhar_number,
      profile_pic: profile_pic,
      password: user.password,
      password_confirmation: user.cpassword,
    }), httpOptions);
  }

  register_company(user, profile_pic): Observable<any> {
    return this.http.post(AUTH_API + 'admin/company_signup', ({
      name: user.username,
      email: user.email,
      profile_pic: profile_pic,
      usertype: user.usertype,
      other_mobile_number: user.other_mobile_number,
      password: user.password,
      password_confirmation: user.cpassword,
    }), httpOptions);
  }

  register_lawyer(user, profile_pic): Observable<any> {
    return this.http.post(AUTH_API + 'auth/lawyer_signup', ({
      name: user.username,
      email: user.email,
      other_mobile_number: user.other_mobile_number,
      address: user.address,
      city: user.city,
      pan_number: user.pan_number,
      aadhar_number: user.aadhar_number,
      provided_service: user.provided_service,
      price_for_service: user.price_for_service,
      law_firm_number: user.law_firm_number,
      practice_number: user.practice_number,
      place_of_practice: user.place_of_practice,
      landline_number: user.landline_number,
      profile_pic: profile_pic,
      password: user.password,
      password_confirmation: user.cpassword,
    }), httpOptions);
  }

  product_insert_sale(details, id, additional_room_array, amenityArray, product_img): Observable<any> {
    // console.log(details.Property_Details.build_name);
    return this.http.post(AUTH_API + 'product/insert_product_sale', JSON.stringify({
      user_id: id,
      draft_form_id: details.Property_Details.draft_form_id,
      build_name: details.Property_Details.build_name,
      type: details.Property_Details.type,
      property_detail: details.Property_Details.property_detail,
      display_address: details.Property_Details.display_address,
      address: details.Property_Location.address,
      city: details.Property_Location.city,
      locality: details.Property_Location.locality,
      nearest_landmark: details.Property_Location.nearest_landmark,
      map_latitude: details.Property_Location.map_latitude,
      map_longitude: details.Property_Location.map_longitude,
      pincode: details.Property_Location.pincode,
      product_image: product_img,
      area: details.Property_Details.area,
      area_unit: details.Property_Details.area_unit,
      carpet_area: details.Property_Details.carpet_area,
      bedroom: details.Property_additional_details.bedroom,
      bathroom: details.Property_additional_details.bathroom,
      balconies: details.Property_additional_details.balconies,
      furnishing_status: details.Property_additional_details.furnishing_status,
      // furnishings: furnishingArray,
      total_floors: details.Property_additional_details.total_floors,
      property_on_floor: details.Property_additional_details.property_on_floor,
      rera_registration_status: details.Property_additional_details.rera_registration_status,
      additional_parking_status: details.Property_additional_details.additional_parking_status,
      equipment: details.Property_additional_details.equipment,
      features: details.Property_additional_details.features,
      nearby_places: details.Property_additional_details.nearby_places,
      additional_rooms_status: details.Property_additional_details.additional_rooms_status,
      possession_by: details.Property_additional_details.possession_by,
      facing_towards: details.Property_additional_details.facing_towards,
      availability_condition: details.Property_additional_details.availability_condition,
      buildyear: details.Property_additional_details.buildyear,
      age_of_property: details.Property_additional_details.age_of_property,
      parking_covered_count: details.Property_additional_details.parking_covered_count,
      parking_open_count: details.Property_additional_details.parking_open_count,
      sale_availability: 1,
      draft: 0,
      ownership: details.Property_price_images.ownership,
      expected_pricing: details.Property_price_images.expected_pricing,
      inclusive_pricing_details: details.Property_price_images.inclusive_pricing_details,
      tax_govt_charge: details.Property_price_images.tax_govt_charge,
      price_negotiable: details.Property_price_images.price_negotiable,
      maintenance_charge_status: details.Property_price_images.maintenance_charge_status,
      maintenance_charge: details.Property_price_images.maintenance_charge,
      maintenance_charge_condition: details.Property_price_images.maintenance_charge_condition,
      deposit: details.Property_price_images.security_deposit,
      brokerage_charges: details.Property_price_images.brokerage_charges,
      inc_electricity_and_water_bill: details.Property_price_images.inc_electricity_and_water_bill,
      video_link: details.Property_price_images.video_link,
      amenities: amenityArray,
      additional_rooms: additional_room_array
    }), httpOptions);
  }
  draft_insert_sale(details, id: any, additional_room_array, amenityArray, product_img): Observable<any> {
    // console.log(details.Property_Details.build_name);
    return this.http.post(AUTH_API + 'product/insert_product_sale', JSON.stringify({
      user_id: id,
      draft_form_id: details.Property_Details.draft_form_id,
      build_name: details.Property_Details.build_name,
      type: details.Property_Details.type,
      property_detail: details.Property_Details.property_detail,
      display_address: details.Property_Details.display_address,
      address: details.Property_Location.address,
      city: details.Property_Location.city,
      locality: details.Property_Location.locality,
      nearest_landmark: details.Property_Location.nearest_landmark,
      map_latitude: details.Property_Location.map_latitude,
      map_longitude: details.Property_Location.map_longitude,
      pincode: details.Property_Location.pincode,
      product_image: product_img,
      area: details.Property_Details.area,
      area_unit: details.Property_Details.area_unit,
      carpet_area: details.Property_Details.carpet_area,
      bedroom: details.Property_additional_details.bedroom,
      bathroom: details.Property_additional_details.bathroom,
      balconies: details.Property_additional_details.balconies,
      furnishing_status: details.Property_additional_details.furnishing_status,
      // furnishings: furnishingArray,
      total_floors: details.Property_additional_details.total_floors,
      property_on_floor: details.Property_additional_details.property_on_floor,
      rera_registration_status: details.Property_additional_details.rera_registration_status,
      additional_parking_status: details.Property_additional_details.additional_parking_status,
      equipment: details.Property_additional_details.equipment,
      features: details.Property_additional_details.features,
      nearby_places: details.Property_additional_details.nearby_places,
      possession_by: details.Property_additional_details.possession_by,
      facing_towards: details.Property_additional_details.facing_towards,
      availability_condition: details.Property_additional_details.availability_condition,
      buildyear: details.Property_additional_details.buildyear,
      age_of_property: details.Property_additional_details.age_of_property,
      parking_covered_count: details.Property_additional_details.parking_covered_count,
      parking_open_count: details.Property_additional_details.parking_open_count,
      sale_availability: 1,
      draft: 1,
      ownership: details.Property_price_images.ownership,
      expected_pricing: details.Property_price_images.expected_pricing,
      inclusive_pricing_details: details.Property_price_images.inclusive_pricing_details,
      tax_govt_charge: details.Property_price_images.tax_govt_charge,
      price_negotiable: details.Property_price_images.price_negotiable,
      negotiable_status: details.Property_price_images.negotiable_status,
      maintenance_charge_status: details.Property_price_images.maintenance_charge_status,
      maintenance_charge: details.Property_price_images.maintenance_charge,
      maintenance_charge_condition: details.Property_price_images.maintenance_charge_condition,
      deposit: details.Property_price_images.security_deposit,
      brokerage_charges: details.Property_price_images.brokerage_charges,
      inc_electricity_and_water_bill: details.Property_price_images.inc_electricity_and_water_bill,
      video_link: details.Property_price_images.video_link,
      amenities: amenityArray,
      additional_rooms: additional_room_array,
      additional_rooms_status: details.Property_additional_details.additional_rooms_status
    }), httpOptions);
  }

  product_insert_rent(details, id, additional_room_array, amenityArray, product_img,): Observable<any> {
    return this.http.post(AUTH_API + 'product/insert_product_rent', JSON.stringify({
      user_id: id,
      build_name: details.Property_Details.build_name,
      draft_form_id: details.Property_Details.draft_form_id,
      type: details.Property_Details.type,
      property_detail: details.Property_Details.property_detail,
      display_address: details.Property_Details.display_address,
      area: details.Property_Details.area,
      area_unit: details.Property_Details.area_unit,
      carpet_area: details.Property_Details.carpet_area,
      bedroom: details.Property_Details.bedroom,
      bathroom: details.Property_Details.bathroom,
      balconies: details.Property_Details.balconies,
      address: details.Property_address.address,
      city: details.Property_address.city,
      locality: details.Property_address.locality,
      pincode: details.Property_address.pincode,
      nearest_landmark: details.Property_address.nearest_landmark,
      map_latitude: details.Property_address.map_latitude,
      map_longitude: details.Property_address.map_longitude,
      nearby_places: details.Property_address.nearby_places,
      product_image: product_img,
      furnishing_status: details.Property_additional_details.furnishing_status,
      total_floors: details.Property_additional_details.total_floors,
      property_on_floor: details.Property_additional_details.property_on_floor,
      // rera_registration_status: details.Property_additional_details.rera_registration_status,
      additional_parking_status: details.Property_additional_details.additional_parking_status,
      equipment: details.Property_additional_details.equipment,
      features: details.Property_additional_details.features,
      // possession_by: details.Property_additional_details.possession_by,
      facing_towards: details.Property_additional_details.facing_towards,
      // availability_condition: details.Property_additional_details.availability_condition,
      buildyear: details.Property_additional_details.buildyear,
      age_of_property: details.Property_additional_details.age_of_property,
      parking_covered_count: details.Property_additional_details.parking_covered_count,
      parking_open_count: details.Property_additional_details.parking_open_count,
      rent_availability: 1,
      draft: 0,
      ownership: details.Property_additional_details.ownership,
      agreement_type: details.Property_additional_details.agreement_type,
      available_for: details.Property_additional_details.available_for,
      duration_of_rent_aggreement: details.Property_additional_details.duration_of_rent_aggreement,
      month_of_notice: details.Property_additional_details.month_of_notice,
      rent_cond: details.Property_additional_details.rent_cond,
      willing_to_rent_out_to: details.Property_additional_details.willing_to_rent_out_to,
      expected_rent: details.Property_price_images.expected_rent,
      //inclusive_pricing_details: details.Property_Pricing.inclusive_pricing_details,
      tax_govt_charge: details.Property_price_images.tax_govt_charge,
      price_negotiable: details.Property_price_images.price_negotiable,
      negotiable_status: details.Property_price_images.negotiable_status,
      maintenance_charge_status: details.Property_price_images.maintenance_charge_status,
      maintenance_charge: details.Property_price_images.maintenance_charge,
      maintenance_charge_condition: details.Property_price_images.maintenance_charge_condition,
      security_deposit: details.Property_price_images.security_deposit,
      brokerage_charges: details.Property_price_images.brokerage_charges,
      inc_electricity_and_water_bill: details.Property_price_images.inc_electricity_and_water_bill,
      video_link: details.Property_price_images.video_link,
      amenities: amenityArray,
      additional_rooms: additional_room_array,
      additional_rooms_status: details.Property_additional_details.additional_rooms_status
    }), httpOptions);
  }
  draft_insert_rent(details, id: any, additional_room_array, amenityArray, product_img): Observable<any> {
    // console.log(details.Property_Details.build_name);
    return this.http.post(AUTH_API + 'product/insert_product_rent', JSON.stringify({
      user_id: id,
      build_name: details.Property_Details.build_name,
      draft_form_id: details.Property_Details.draft_form_id,
      type: details.Property_Details.type,
      property_detail: details.Property_Details.property_detail,
      display_address: details.Property_Details.display_address,
      area: details.Property_Details.area,
      area_unit: details.Property_Details.area_unit,
      carpet_area: details.Property_Details.carpet_area,
      bedroom: details.Property_Details.bedroom,
      bathroom: details.Property_Details.bathroom,
      balconies: details.Property_Details.balconies,
      address: details.Property_address.address,
      city: details.Property_address.city,
      locality: details.Property_address.locality,
      pincode: details.Property_address.pincode,
      nearest_landmark: details.Property_address.nearest_landmark,
      map_latitude: details.Property_address.map_latitude,
      map_longitude: details.Property_address.map_longitude,
      nearby_places: details.Property_address.nearby_places,
      product_image: product_img,
      furnishing_status: details.Property_additional_details.furnishing_status,
      total_floors: details.Property_additional_details.total_floors,
      property_on_floor: details.Property_additional_details.property_on_floor,
      // rera_registration_status: details.Property_additional_details.rera_registration_status,
      additional_parking_status: details.Property_additional_details.additional_parking_status,
      equipment: details.Property_additional_details.equipment,
      features: details.Property_additional_details.features,
      // possession_by: details.Property_additional_details.possession_by,
      facing_towards: details.Property_additional_details.facing_towards,
      // availability_condition: details.Property_additional_details.availability_condition,
      buildyear: details.Property_additional_details.buildyear,
      age_of_property: details.Property_additional_details.age_of_property,
      parking_covered_count: details.Property_additional_details.parking_covered_count,
      parking_open_count: details.Property_additional_details.parking_open_count,
      rent_availability: 1,
      draft: 1,
      ownership: details.Property_additional_details.ownership,
      agreement_type: details.Property_additional_details.agreement_type,
      available_for: details.Property_additional_details.available_for,
      duration_of_rent_aggreement: details.Property_additional_details.duration_of_rent_aggreement,
      month_of_notice: details.Property_additional_details.month_of_notice,
      rent_cond: details.Property_additional_details.rent_cond,
      willing_to_rent_out_to: details.Property_additional_details.willing_to_rent_out_to,
      expected_rent: details.Property_price_images.expected_rent,
      //inclusive_pricing_details: details.Property_Pricing.inclusive_pricing_details,
      tax_govt_charge: details.Property_price_images.tax_govt_charge,
      price_negotiable: details.Property_price_images.price_negotiable,
      negotiable_status: details.Property_price_images.negotiable_status,
      maintenance_charge_status: details.Property_price_images.maintenance_charge_status,
      maintenance_charge: details.Property_price_images.maintenance_charge,
      maintenance_charge_condition: details.Property_price_images.maintenance_charge_condition,
      security_deposit: details.Property_price_images.security_deposit,
      brokerage_charges: details.Property_price_images.brokerage_charges,
      inc_electricity_and_water_bill: details.Property_price_images.inc_electricity_and_water_bill,
      video_link: details.Property_price_images.video_link,
      amenities: amenityArray,
      additional_rooms: additional_room_array,
      additional_rooms_status: details.Property_additional_details.additional_rooms_status
    }), httpOptions);
  }

  product_see(prodid_no): Observable<any> {
    return this.http.post(AUTH_API + 'product/see', JSON.stringify({
      prod_id: prodid_no,
    }), httpOptions);
  }
  product_login_see(prodid_no): Observable<any> {
    return this.http.post(AUTH_API + 'product/product_login_see', JSON.stringify({
      prod_id: prodid_no,
    }), httpOptions);
  }
  User_productCount(prodid_no): Observable<any> {
    return this.http.post(AUTH_API + 'product/User_productCount', JSON.stringify({
      prod_id: prodid_no,
    }), httpOptions);
  }
  get_CountData(): Observable<any> {
    return this.http.get(AUTH_API + 'product/User_CountData', { responseType: 'json' });
  }

  recently_view(): Observable<any> {
    return this.http.get(AUTH_API + 'product/User_Recently_pro', { responseType: 'json' });
  }
  product_similarproperty(cityValue): Observable<any> {
    return this.http.post(AUTH_API + 'product/similarproperty', JSON.stringify({
      cityValue: cityValue,
    }), httpOptions);
  }
  login_similarproperty(cityValue): Observable<any> {
    return this.http.post(AUTH_API + 'product/loginSimilarproperty', JSON.stringify({
      cityValue: cityValue,
    }), httpOptions);
  }

  check_order_product(id: any): Observable<any> {
    return this.http.post(AUTH_API + 'product/check_order_product', JSON.stringify({
      product_id: id,
    }), httpOptions);
  }

  Login_search_home(data, amenityArray): Observable<any> {
    console.log(data);
    return this.http.post(AUTH_API + 'product/Login_search_home', JSON.stringify({
      build_name: data.value.build_name,
      type: data.value.type,
      Location: data.value.Location,
      area_unit: data.value.area_unit,
      Bathrooms: data.value.Bathrooms,
      Bedrooms: data.value.Bedrooms,
      availability_condition: data.value.availability_condition,
      Years: data.value.Years,
      Minimum: data.value.sliderControl[0],
      Maximum: data.value.sliderControl[1],
      property_status: data.value.property_status,
      amenities: amenityArray,
    }), httpOptions);
  }
  search(data, amenityArray): Observable<any> {
    return this.http.post(AUTH_API + 'product/search', JSON.stringify({
      build_name: data.value.build_name,
      type: data.value.type,
      Location: data.value.city,
      area_unit: data.value.area_unit,
      Bathrooms: data.value.Bathrooms,
      Bedrooms: data.value.Bedrooms,
      availability_condition: data.value.availability_condition,
      Years: data.value.Years,
      Minimum: data.value.sliderControl[0],
      Maximum: data.value.sliderControl[1],
      property_status: data.value.property_status,
      amenities: amenityArray,
    }), httpOptions);
  }
  product_Searching(data, amenityArray): Observable<any> {
    return this.http.post(GlobalConstants.apiURL + 'product/product_Searching', JSON.stringify({
      build_name: data.build_name,
      Location: data.Location,
      area_unit: data.area_unit,
      type: data.type,
      Bathrooms: data.Bathrooms,
      Bedrooms: data.Bedrooms,
      availability_condition: data.availability_condition,
      Years: data.Years,
      Minimum: data.Minimum,
      Maximum: data.Maximum,
      property_status: data.property_status,
      amenities: amenityArray,
    }), httpOptions);
  }
  product_SearchingLogin(data: { build_name: any; Location: any; area_unit: any; type: any; Bathrooms: any; Bedrooms: any; availability_condition: any; Years: any; Minimum: any; Maximum: any; property_status: any; }, amenityArray: any[]): Observable<any> {
    return this.http.post(AUTH_API + 'product/product_Searching_login', JSON.stringify({
      build_name: data.build_name,
      Location: data.Location,
      area_unit: data.area_unit,
      type: data.type,
      Bathrooms: data.Bathrooms,
      Bedrooms: data.Bedrooms,
      availability_condition: data.availability_condition,
      Years: data.Years,
      Minimum: data.Minimum,
      Maximum: data.Maximum,
      property_status: data.property_status,
      amenities: amenityArray,
    }), httpOptions);
  }
  search_pro_type(id): Observable<any> {
    console.log(id);
    return this.http.post(GlobalConstants.apiURL + 'product/search_pro_type', JSON.stringify({
      id: id,
    }), httpOptions);
  }
  search_pro_type_login(id: number): Observable<any> {
    return this.http.post(AUTH_API + 'product/search_pro_type_login', JSON.stringify({
      id: id,
    }), httpOptions);
  }
  admin_loans(data: { bank: any; address: any; interest_rate: any; type: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'admin/admin_loans', JSON.stringify({
      bank: data.bank,
      address: data.address,
      interest_rate: data.interest_rate,
      type: data.type,
    }), httpOptions);
  }

  city_search(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'product/city_search', JSON.stringify({
      city: data,
    }), httpOptions);
  }
  city_search_login(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'product/city_search_login', JSON.stringify({
      city: data,
    }), httpOptions);
  }

  admin_loan_delete(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'admin/loan_delete', JSON.stringify({
      id: data,
    }), httpOptions);
  }

  requirement_index(id: string): Observable<any> {
    return this.http.post(AUTH_API + 'product/req_index', JSON.stringify({
      user_id: id,
    }), httpOptions);
  }

  requirements(detail: any = {}, user_id: any): Observable<any> {
    return this.http.post(AUTH_API + 'product/requ', JSON.stringify({
      user_id: user_id,
      rental_sale_condition: detail.rental_sale_condition,
      purchase_mode: detail.purchase_mode,
      cash_amount: detail.cash_amount,
      loan_amount: detail.loan_amount,
      property_type: detail.property_type,
      requirement: detail.requirement,
    }), httpOptions);
  }

  saveSearch(id: any, prod_id: any): Observable<any> {
    return this.http.post(AUTH_API + 'product/save_search', JSON.stringify({
      user_id: id,
      product_id: prod_id
    }), httpOptions);
  }

  review_delete($id: string) {
    return this.http.delete(AUTH_API + 'admin/reviews/delete/' + $id);
  }

  property_delete(id: any): Observable<any> {
    return this.http.post(AUTH_API + 'product/delete_product', JSON.stringify({
      product_id: id,
    }), httpOptions);
  }

  property_delete_admin(id: any): Observable<any> {
    return this.http.post(AUTH_API + 'admin/delete_product_admin', JSON.stringify({
      product_id: id,
    }), httpOptions);
  }

  lawyer_service_delete(id: any): Observable<any> {
    return this.http.post(AUTH_API + 'product/lawyer_service_delete', JSON.stringify({
      id: id,
    }), httpOptions);
  }

  requirement_delete(id: any): Observable<any> {
    return this.http.post(AUTH_API + 'product/requirement_delete', JSON.stringify({
      id: id,
    }), httpOptions);
  }
  // compariosion property
  Crete_product_comp(id: number): Observable<any> {
    return this.http.post(AUTH_API + 'product/Product_comp', JSON.stringify({
      product_id: id,
    }), httpOptions);
  }
  pro_comp_delete(id: number): Observable<any> {
    return this.http.post(AUTH_API + 'product/pro_comp_delete', JSON.stringify({
      product_id: id,
    }), httpOptions);
  }

  Wishlist(id: any): Observable<any> {
    return this.http.post(AUTH_API + 'product/wishlist', JSON.stringify({
      product_id: id,
    }), httpOptions);
  }
  WishlistRemove(id: any): Observable<any> {
    return this.http.post(AUTH_API + 'product/wishlistDelete', JSON.stringify({
      product_id: id,
    }), httpOptions);
  }
  create_review(form: { stars: any; rev_subject: any; rev_content: any; }, id: any): Observable<any> {
    return this.http.post(AUTH_API + 'product/post_review', JSON.stringify({
      product_id: id,
      stars: form.stars,
      rev_subject: form.rev_subject,
      rev_content: form.rev_content,

    }), httpOptions);
  }

  uploadProfile_Image(formdata): Observable<any> {
    console.log(formdata.profile_image);
    return this.http.post(AUTH_API + 'auth/upload_profile_pic', formdata);
  }

  password_update(form: { old_password: any; new_password: any; confirm_password: any; }): Observable<any> {
    console.log(form)
    return this.http.post(AUTH_API + 'auth/change_password', JSON.stringify({
      old_password: form.old_password,
      new_password: form.new_password,
      confirm_password: form.confirm_password,

    }), httpOptions);
  }

  product_review(id: any): Observable<any> {
    return this.http.post(AUTH_API + 'product/product_review', JSON.stringify({
      id: id,
    }), httpOptions);
  }

  getproductWishlist(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/get_product_wishlist', { responseType: 'json' });
  }
  product_listing_wishlist(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/product_listing_wishlist', { responseType: 'json' });
  }

  lawyer_create_service(data: { service_name: any; service_details: any; price: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'product/lawyer_create_service', JSON.stringify({
      service_name: data.service_name,
      service_details: data.service_details,
      price: data.price,
    }), httpOptions);
  }

  lawyer_get(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'product/lawyer_page', JSON.stringify({
      id: data
    }), httpOptions);
  }

  user_get(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'admin/user_page', JSON.stringify({
      id: data
    }), httpOptions);
  }
  Propery_get_id(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'product/Propery_get_id', JSON.stringify({
      id: data
    }), httpOptions);
  }
  verify(number, otp: string, email_id, first_name): Observable<any> {
    let name = "" + number
    console.log(typeof (name), typeof (otp))
    return this.http.post(AUTH_API + 'auth/verify', JSON.stringify({
      phone_number: name,
      verification_code: otp,
      email_address: email_id,
      name_first: first_name
    }), httpOptions);
  }

  /* Code added by Radhika Start */
  verify_mobile(number, otp: string, id: number): Observable<any> {
    let name = "" + number
    console.log(typeof (name), typeof (otp), typeof (id));
    return this.http.post(AUTH_API + 'auth/verify_mob', JSON.stringify({
      other_mobile_number: name,
      verification_code: otp,
      user_id: id
    }), httpOptions);
  }
  verify_profile_mobile(number, otp: string, id: number): Observable<any> {
    let name = "" + number
    console.log(typeof (name), typeof (otp), typeof (id));
    return this.http.post(AUTH_API + 'auth/verify_profile_mob', JSON.stringify({
      other_mobile_number: name,
      verification_code: otp,
      user_id: id
    }), httpOptions);
  }
  /* Code added by Radhika End */
  reverify(otp: any): Observable<any> {
    return this.http.post(AUTH_API + 'auth/reverify', JSON.stringify({
      verification_code: otp
    }), httpOptions);
  }







  user_update(user: { email: any; username: any; profile_pic: any; company_name: any; company_url: any; address: any; city: any; other_mobile_number: any; landline_number: any; company_profile: any; pan_number: any; aadhar_number: any; provided_service: any; place_of_practice: any; price_for_service: any; law_firm_number: any; practice_number: any; blocked: any; phone_number_verification_status: any; }, id: any): Observable<any> {
    return this.http.post(AUTH_API + 'admin/user_update_new', ({
      id: id,
      email: user.email,
      name: user.username,
      other_mobile_number: user.other_mobile_number
    }), httpOptions);
  }

  product_sale_update(id: any, details: { build_name: any; type: any; address: any; display_address: any; city: any; locality: any; property_detail: any; nearest_landmark: any; map_latitude: any; map_longitude: any; area: any; carpet_area: any; area_unit: any; bedroom: any; bathroom: any; balconies: any; additional_rooms: any; equipment: any; features: any; nearby_places: any; age_of_property: any; furnishing_status: any; property_on_floor: any; total_floors: any; facing_towards: any; rera_registration_status: any; additional_parking_status: any; buildyear: any; availability_condition: any; possession_by: any; parking_covered_count: any; parking_open_count: any; ownership: any; expected_pricing: any; deposit: any; inclusive_pricing_details: any; tax_govt_charge: any; price_negotiable: any; maintenance_charge_status: any; brokerage_charges: any; maintenance_charge: any; maintenance_charge_condition: any; rent_cond: any; available_for: any; product_image1: any; product_image2: any; product_image3: any; product_image4: any; product_image5: any; expected_rent: any; inc_electricity_and_water_bill: any; security_deposit: any; duration_of_rent_aggreement: any; month_of_notice: any; willing_to_rent_out_to: any; agreement_type: any; delete_flag: any; view_counter: any; }, furnishingArray: any, amenityArray: any): Observable<any> {
    console.log(details);
    return this.http.post(AUTH_API + 'admin/product_sale_update', JSON.stringify({
      id: id,
      build_name: details.build_name,
      type: details.type,
      address: details.address,
      display_address: details.display_address,
      city: details.city,
      locality: details.locality,
      property_detail: details.property_detail,
      nearest_landmark: details.nearest_landmark,
      map_latitude: details.map_latitude,
      map_longitude: details.map_longitude,
      area: details.area,
      carpet_area: details.carpet_area,
      area_unit: details.area_unit,
      bedroom: details.bedroom,
      bathroom: details.bathroom,
      balconies: details.balconies,
      additional_rooms: details.additional_rooms,
      equipment: details.equipment,
      features: details.features,
      nearby_places: details.nearby_places,
      age_of_property: details.age_of_property,
      furnishing_status: details.furnishing_status,
      property_on_floor: details.property_on_floor,
      total_floors: details.total_floors,
      facing_towards: details.facing_towards,
      rera_registration_status: details.rera_registration_status,
      additional_parking_status: details.additional_parking_status,
      buildyear: details.buildyear,
      availability_condition: details.availability_condition,
      possession_by: details.possession_by,
      amenities: amenityArray,
      parking_covered_count: details.parking_covered_count,
      parking_open_count: details.parking_open_count,
      furnishings: furnishingArray,
      ownership: details.ownership,
      expected_pricing: details.expected_pricing,
      deposit: details.deposit,
      inclusive_pricing_details: details.inclusive_pricing_details,
      tax_govt_charge: details.tax_govt_charge,
      price_negotiable: details.price_negotiable,
      maintenance_charge_status: details.maintenance_charge_status,
      brokerage_charges: details.brokerage_charges,
      maintenance_charge: details.maintenance_charge,
      maintenance_charge_condition: details.maintenance_charge_condition,
      // description: details.description,
      rent_cond: details.rent_cond,
      available_for: details.available_for,
      product_image1: details.product_image1,
      product_image2: details.product_image2,
      product_image3: details.product_image3,
      product_image4: details.product_image4,
      product_image5: details.product_image5,
      expected_rent: details.expected_rent,
      inc_electricity_and_water_bill: details.inc_electricity_and_water_bill,
      security_deposit: details.security_deposit,
      duration_of_rent_aggreement: details.duration_of_rent_aggreement,
      month_of_notice: details.month_of_notice,
      willing_to_rent_out_to: details.willing_to_rent_out_to,
      agreement_type: details.agreement_type,
      delete_flag: details.delete_flag,
      view_counter: details.view_counter
    }), httpOptions);
  }


  product_rent_update(details, id, additional_room_array, amenityArray, amenity_Uncheck, furnishingArray, product_img): Observable<any> {
    return this.http.post(AUTH_API + 'product/product_Rent_update', JSON.stringify({
      user_id: id,
      id: id,
      build_name: details.Property_Details.build_name,
      type: details.Property_Details.type,
      property_detail: details.Property_Details.property_detail,
      display_address: details.Property_Details.display_address,
      area: details.Property_Details.area,
      area_unit: details.Property_Details.area_unit,
      carpet_area: details.Property_Details.carpet_area,
      bedroom: details.Property_Details.bedroom,
      bathroom: details.Property_Details.bathroom,
      balconies: details.Property_Details.balconies,
      address: details.Property_address.address,
      city: details.Property_address.city,
      locality: details.Property_address.locality,
      pincode: details.Property_address.pincode,
      nearest_landmark: details.Property_address.nearest_landmark,
      map_latitude: details.Property_address.map_latitude,
      map_longitude: details.Property_address.map_longitude,
      nearby_places: details.Property_address.nearby_places,
      product_image: product_img,
      furnishing_status: details.Property_additional_details.furnishing_status,
      additional_rooms_status: details.Property_additional_details.additional_rooms_status,
      total_floors: details.Property_additional_details.total_floors,
      property_on_floor: details.Property_additional_details.property_on_floor,
      rera_registration_status: details.Property_additional_details.rera_registration_status,
      additional_parking_status: details.Property_additional_details.additional_parking_status,
      equipment: details.Property_additional_details.equipment,
      features: details.Property_additional_details.features,
      // possession_by: details.Property_additional_details.possession_by,
      facing_towards: details.Property_additional_details.facing_towards,
      // availability_condition: details.Property_additional_details.availability_condition,
      buildyear: details.Property_additional_details.buildyear,
      age_of_property: details.Property_additional_details.age_of_property,
      parking_covered_count: details.Property_additional_details.parking_covered_count,
      parking_open_count: details.Property_additional_details.parking_open_count,
      rent_availability: 1,
      draft: 0,
      ownership: details.Property_additional_details.ownership,
      agreement_type: details.Property_additional_details.agreement_type,
      available_for: details.Property_additional_details.available_for,
      duration_of_rent_aggreement: details.Property_additional_details.duration_of_rent_aggreement,
      month_of_notice: details.Property_additional_details.month_of_notice,
      rent_cond: details.Property_additional_details.rent_cond,
      willing_to_rent_out_to: details.Property_additional_details.willing_to_rent_out_to,
      expected_rent: details.Property_price_images.expected_rent,
      //inclusive_pricing_details: details.Property_Pricing.inclusive_pricing_details,
      tax_govt_charge: details.Property_price_images.tax_govt_charge,
      price_negotiable: details.Property_price_images.price_negotiable,
      negotiable_status: details.Property_price_images.negotiable_status,
      maintenance_charge_status: details.Property_price_images.maintenance_charge_status,
      maintenance_charge: details.Property_price_images.maintenance_charge,
      maintenance_charge_condition: details.Property_price_images.maintenance_charge_condition,
      security_deposit: details.Property_price_images.security_deposit,
      brokerage_charges: details.Property_price_images.brokerage_charges,
      inc_electricity_and_water_bill: details.Property_price_images.inc_electricity_and_water_bill,
      video_link: details.Property_price_images.video_link,
      amenities: amenityArray,
      amenity_Uncheck: amenity_Uncheck,
      additional_rooms: additional_room_array
    }), httpOptions);
  }
  draft_rent_update(details, id: any, additional_room_array: any[], amenityArray: any[], amenity_Uncheck: any[], furnishingArray: any[], product_img: string[]): Observable<any> {
    return this.http.post(AUTH_API + 'product/product_Rent_update', JSON.stringify({
      user_id: id,
      id: id,
      build_name: details.Property_Details.build_name,
      type: details.Property_Details.type,
      property_detail: details.Property_Details.property_detail,
      display_address: details.Property_Details.display_address,
      area: details.Property_Details.area,
      area_unit: details.Property_Details.area_unit,
      carpet_area: details.Property_Details.carpet_area,
      bedroom: details.Property_Details.bedroom,
      bathroom: details.Property_Details.bathroom,
      balconies: details.Property_Details.balconies,
      address: details.Property_address.address,
      city: details.Property_address.city,
      locality: details.Property_address.locality,
      pincode: details.Property_address.pincode,
      nearest_landmark: details.Property_address.nearest_landmark,
      map_latitude: details.Property_address.map_latitude,
      map_longitude: details.Property_address.map_longitude,
      nearby_places: details.Property_address.nearby_places,
      product_image: product_img,
      furnishing_status: details.Property_additional_details.furnishing_status,
      additional_rooms_status: details.Property_additional_details.additional_rooms_status,
      total_floors: details.Property_additional_details.total_floors,
      property_on_floor: details.Property_additional_details.property_on_floor,
      rera_registration_status: details.Property_additional_details.rera_registration_status,
      additional_parking_status: details.Property_additional_details.additional_parking_status,
      equipment: details.Property_additional_details.equipment,
      features: details.Property_additional_details.features,
      // possession_by: details.Property_additional_details.possession_by,
      facing_towards: details.Property_additional_details.facing_towards,
      // availability_condition: details.Property_additional_details.availability_condition,
      buildyear: details.Property_additional_details.buildyear,
      age_of_property: details.Property_additional_details.age_of_property,
      parking_covered_count: details.Property_additional_details.parking_covered_count,
      parking_open_count: details.Property_additional_details.parking_open_count,
      rent_availability: 1,
      draft: 1,
      ownership: details.Property_additional_details.ownership,
      agreement_type: details.Property_additional_details.agreement_type,
      available_for: details.Property_additional_details.available_for,
      duration_of_rent_aggreement: details.Property_additional_details.duration_of_rent_aggreement,
      month_of_notice: details.Property_additional_details.month_of_notice,
      rent_cond: details.Property_additional_details.rent_cond,
      willing_to_rent_out_to: details.Property_additional_details.willing_to_rent_out_to,
      expected_rent: details.Property_price_images.expected_rent,
      //inclusive_pricing_details: details.Property_Pricing.inclusive_pricing_details,
      tax_govt_charge: details.Property_price_images.tax_govt_charge,
      price_negotiable: details.Property_price_images.price_negotiable,
      negotiable_status: details.Property_price_images.negotiable_status,
      maintenance_charge_status: details.Property_price_images.maintenance_charge_status,
      maintenance_charge: details.Property_price_images.maintenance_charge,
      maintenance_charge_condition: details.Property_price_images.maintenance_charge_condition,
      security_deposit: details.Property_price_images.security_deposit,
      brokerage_charges: details.Property_price_images.brokerage_charges,
      inc_electricity_and_water_bill: details.Property_price_images.inc_electricity_and_water_bill,
      video_link: details.Property_price_images.video_link,
      amenities: amenityArray,
      amenity_Uncheck: amenity_Uncheck,
      additional_rooms: additional_room_array
    }), httpOptions);
  }
  product_sales_update(details, id, additional_room_array, amenityArray, amenity_Uncheck, furnishingArray, product_img): Observable<any> {

    return this.http.post(AUTH_API + 'product/product_sales_update', JSON.stringify({
      user_id: id,
      id: id,
      build_name: details.Property_Details.build_name,
      type: details.Property_Details.type,
      property_detail: details.Property_Details.property_detail,
      display_address: details.Property_Details.display_address,
      address: details.Property_Location.address,
      city: details.Property_Location.city,
      locality: details.Property_Location.locality,
      nearest_landmark: details.Property_Location.nearest_landmark,
      map_latitude: details.Property_Location.map_latitude,
      map_longitude: details.Property_Location.map_longitude,
      pincode: details.Property_Location.pincode,
      product_image: product_img,
      area: details.Property_Details.area,
      area_unit: details.Property_Details.area_unit,
      carpet_area: details.Property_Details.carpet_area,
      bedroom: details.Property_additional_details.bedroom,
      bathroom: details.Property_additional_details.bathroom,
      balconies: details.Property_additional_details.balconies,
      furnishing_status: details.Property_additional_details.furnishing_status,
      // furnishings: furnishingArray,
      total_floors: details.Property_additional_details.total_floors,
      property_on_floor: details.Property_additional_details.property_on_floor,
      rera_registration_status: details.Property_additional_details.rera_registration_status,
      additional_parking_status: details.Property_additional_details.additional_parking_status,
      equipment: details.Property_additional_details.equipment,
      features: details.Property_additional_details.features,
      nearby_places: details.Property_additional_details.nearby_places,
      additional_rooms_status: details.Property_additional_details.additional_rooms_status,
      possession_by: details.Property_additional_details.possession_by,
      facing_towards: details.Property_additional_details.facing_towards,
      availability_condition: details.Property_additional_details.availability_condition,
      buildyear: details.Property_additional_details.buildyear,
      age_of_property: details.Property_additional_details.age_of_property,
      parking_covered_count: details.Property_additional_details.parking_covered_count,
      parking_open_count: details.Property_additional_details.parking_open_count,
      sale_availability: 1,
      draft: 0,
      ownership: details.Property_price_images.ownership,
      expected_pricing: details.Property_price_images.expected_pricing,
      inclusive_pricing_details: details.Property_price_images.inclusive_pricing_details,
      tax_govt_charge: details.Property_price_images.tax_govt_charge,
      price_negotiable: details.Property_price_images.price_negotiable,
      negotiable_status: details.Property_price_images.negotiable_status,
      maintenance_charge_status: details.Property_price_images.maintenance_charge_status,
      maintenance_charge: details.Property_price_images.maintenance_charge,
      maintenance_charge_condition: details.Property_price_images.maintenance_charge_condition,
      deposit: details.Property_price_images.security_deposit,
      brokerage_charges: details.Property_price_images.brokerage_charges,
      inc_electricity_and_water_bill: details.Property_price_images.inc_electricity_and_water_bill,
      video_link: details.Property_price_images.video_link,
      amenities: amenityArray,
      amenity_Uncheck: amenity_Uncheck,
      additional_rooms: additional_room_array,
    }), httpOptions);
  }
  draft_sales_update(details: { Property_Details: { build_name: any; type: any; property_detail: any; display_address: any; area: any; area_unit: any; carpet_area: any; }; Property_Location: { address: any; city: any; locality: any; nearest_landmark: any; map_latitude: any; map_longitude: any; pincode: any; }; Property_additional_details: { bedroom: any; bathroom: any; balconies: any; furnishing_status: any; total_floors: any; property_on_floor: any; rera_registration_status: any; additional_parking_status: any; equipment: any; features: any; nearby_places: any; additional_rooms_status: any; possession_by: any; facing_towards: any; availability_condition: any; buildyear: any; age_of_property: any; parking_covered_count: any; parking_open_count: any; }; Property_price_images: { ownership: any; expected_pricing: any; inclusive_pricing_details: any; tax_govt_charge: any; price_negotiable: any; negotiable_status: any; maintenance_charge_status: any; maintenance_charge: any; maintenance_charge_condition: any; security_deposit: any; brokerage_charges: any; inc_electricity_and_water_bill: any; video_link: any; }; }, id: any, additional_room_array: any[], amenityArray: any[], amenity_Uncheck: any[], furnishingArray: any[], product_img: string[]): Observable<any> {
    return this.http.post(AUTH_API + 'product/product_sales_update', JSON.stringify({
      user_id: id,
      id: id,
      build_name: details.Property_Details.build_name,
      type: details.Property_Details.type,
      property_detail: details.Property_Details.property_detail,
      display_address: details.Property_Details.display_address,
      address: details.Property_Location.address,
      city: details.Property_Location.city,
      locality: details.Property_Location.locality,
      nearest_landmark: details.Property_Location.nearest_landmark,
      map_latitude: details.Property_Location.map_latitude,
      map_longitude: details.Property_Location.map_longitude,
      pincode: details.Property_Location.pincode,
      product_image: product_img,
      area: details.Property_Details.area,
      area_unit: details.Property_Details.area_unit,
      carpet_area: details.Property_Details.carpet_area,
      bedroom: details.Property_additional_details.bedroom,
      bathroom: details.Property_additional_details.bathroom,
      balconies: details.Property_additional_details.balconies,
      furnishing_status: details.Property_additional_details.furnishing_status,
      // furnishings: furnishingArray,
      total_floors: details.Property_additional_details.total_floors,
      property_on_floor: details.Property_additional_details.property_on_floor,
      rera_registration_status: details.Property_additional_details.rera_registration_status,
      additional_parking_status: details.Property_additional_details.additional_parking_status,
      equipment: details.Property_additional_details.equipment,
      features: details.Property_additional_details.features,
      nearby_places: details.Property_additional_details.nearby_places,
      additional_rooms_status: details.Property_additional_details.additional_rooms_status,
      possession_by: details.Property_additional_details.possession_by,
      facing_towards: details.Property_additional_details.facing_towards,
      availability_condition: details.Property_additional_details.availability_condition,
      buildyear: details.Property_additional_details.buildyear,
      age_of_property: details.Property_additional_details.age_of_property,
      parking_covered_count: details.Property_additional_details.parking_covered_count,
      parking_open_count: details.Property_additional_details.parking_open_count,
      sale_availability: 1,
      draft: 1,
      ownership: details.Property_price_images.ownership,
      expected_pricing: details.Property_price_images.expected_pricing,
      inclusive_pricing_details: details.Property_price_images.inclusive_pricing_details,
      tax_govt_charge: details.Property_price_images.tax_govt_charge,
      price_negotiable: details.Property_price_images.price_negotiable,
      negotiable_status: details.Property_price_images.negotiable_status,
      maintenance_charge_status: details.Property_price_images.maintenance_charge_status,
      maintenance_charge: details.Property_price_images.maintenance_charge,
      maintenance_charge_condition: details.Property_price_images.maintenance_charge_condition,
      deposit: details.Property_price_images.security_deposit,
      brokerage_charges: details.Property_price_images.brokerage_charges,
      inc_electricity_and_water_bill: details.Property_price_images.inc_electricity_and_water_bill,
      video_link: details.Property_price_images.video_link,
      amenities: amenityArray,
      amenity_Uncheck: amenity_Uncheck,
      additional_rooms: additional_room_array,
    }), httpOptions);
  }
  delete_pro_img(id): Observable<any> {
    return this.http.post(AUTH_API + 'product/delete_pro_img', JSON.stringify({
      product_id: id,
    }), httpOptions);
  }

  // adminEndpoints

  admin_login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'admin/admin_login', JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }), httpOptions);
  }

  get_pincodebyid(id): Observable<any> {
    return this.http.post(AUTH_API + 'auth/get_pincodebyid', JSON.stringify({
      id: id,
    }), httpOptions);
  }
  crm_call(user_id): Observable<any> {
    return this.http.post(AUTH_API + 'auth/crm_api_call', ({
      id: user_id
    }), httpOptions);
  }

  proceedToPayment(id, plans_type): Observable<any> {
    return this.http.post(AUTH_API + 'auth/payment', JSON.stringify({
      id: id,
      plans_type: plans_type,
    }), httpOptions);
  }

  user_logs(ip_address, device_info, browser_info, url_info, pro_id, type, userEmail, input_info, user_cart): Observable<any> {
    return this.http.post(AUTH_API + 'user_logs', JSON.stringify({
      ip_address: ip_address,
      device_info: device_info,
      browser_info: browser_info,
      url_info: url_info,
      pro_id: pro_id,
      type: type,
      userEmail: userEmail,
      input_info: input_info,
      user_cart: user_cart,
    }), httpOptions);
  }

  searching_area(data): Observable<any> {
    return this.http.post(GlobalConstants.apiURL + 'product/local_service', JSON.stringify({
      Area: data.Area,
      LocalArea: data.LocalArea,
      service: data.service,
    }), httpOptions);
  }
  get_localareaby_id(id): Observable<any> {
    return this.http.post(GlobalConstants.apiURL + 'product/get_localareaby_id', JSON.stringify({
      id: id,
    }), httpOptions);
  }
  get_service_id(id): Observable<any> {
    return this.http.post(GlobalConstants.apiURL + 'product/get_service_id', JSON.stringify({
      id: id,
    }), httpOptions);
  }
  getarea_user_details(user_id): Observable<any> {
    return this.http.post(GlobalConstants.apiURL + 'product/getarea_user_details', JSON.stringify({
      user_id: user_id,
    }), httpOptions);
  }
  service_user_reviews(data): Observable<any> {
    return this.http.post(GlobalConstants.apiURL + 'product/service_user_reviews', JSON.stringify({
      user_id: data.user_id,
      s_user_id: data.s_user_id,
      stars: data.stars,
      content: data.content,
    }), httpOptions);
  }



}
