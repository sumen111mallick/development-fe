import { GlobalConstants } from './../global-constants';
import { Title } from '@angular/platform-browser';
import { UserService } from './../_services/user.service';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admingetusers',
  templateUrl: './admingetusers.component.html',
  styleUrls: ['./admingetusers.component.css']
})
export class AdmingetusersComponent implements OnInit {

  form: any =  {};
  errorMessage = '';
  content_agent;
  content_builder
  content_individual
  content_internal_user
  content_admin

  ftpURL = GlobalConstants.ftpURL;

  id
  content
  currentUser
  profile_pic
  email
  usertype
  phn_no
  company_name
  company_url
  city
  address
  landline_number
  company_profile
  pan_number
  aadhar_number
  provided_service
  price_for_service
  place_of_practice
  practice_number
  law_firm_number
  email_verifyd
  usercat
  email_verify
  id_created_at
  phone_number_verification_status

  userForm = this.fb.group({
    username: [''],
    email: [''],
    phone: [''],
    address1: [''],
    address2: [''],
    password: [''],
    confirm_password: [''],
    branch: [''],
    user_type: [''],
    area_name: [''],
    all_usersControl: [false],
    propertiesControl: [false],
    blogControl: [false],
    requirementsControl: [false],
    reviewsControl: [false],
    lawyerControl: [false],
    loanControl: [false],
    user_creatorControl: [false]
  });

  constructor(
    private titleservice: Title,
    private userService: UserService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.titleservice.setTitle('All Properties')
    this.userService.getAdmin_users().pipe().subscribe(
      data => {
        this.content_agent = data.data_agent;
        this.content_builder = data.data_builder;
        this.content_individual = data.data_individual;
        this.content_internal_user = data.data_internal_user;
        this.content_admin = data.data_admin;
        //console.log(data)

      },
      err => {
        //console.log(err)
      }
    )

  }

  user_details(data): void {
    //console.log(data);
    this.authService.user_get(data).subscribe(
      (data: any) => {
        //console.log(data);
        this.content = data.data.data;
        this.id = data.data.id;
        this.currentUser = data.data.name;
        this.profile_pic = data.data.profile_pic
        this.email = data.data.email;
        this.usertype = data.data.usertype;
        this.phn_no = data.data.other_mobile_number;
        this.company_name = data.data.company_name
        this.company_url = data.data.company_url
        this.address = data.data.address
        this.city = data.data.city
        this.landline_number = data.data.landline_number
        this.company_profile = data.data.company_profile
        this.pan_number = data.data.pan_number
        this.aadhar_number = data.data.aadhar_number
        this.provided_service = data.data.provided_service
        this.place_of_practice = data.data.place_of_practice
        this.price_for_service = data.data.price_for_service
        this.law_firm_number = data.data.law_firm_number
        this.practice_number = data.data.practice_number
        this.phone_number_verification_status = data.data.phone_number_verification_status



        this.form.username = this.currentUser
        this.form.company_name = this.company_name
        this.form.company_url = this.company_name
        this.form.address = this.address
        this.form.city = this.city
        this.form.other_mobile_number = this.phn_no
        this.form.landline_number = this.landline_number
        this.form.company_profile = this.company_profile
        this.form.pan_number = this.pan_number
        this.form.aadhar_number = this.aadhar_number
        this.form.provided_service = this.provided_service
        this.form.place_of_practice = this.place_of_practice
        this.form.price_for_service = this.price_for_service
        this.form.law_firm_number = this.law_firm_number
        this.form.practice_number = this.practice_number
        this.form.profile_pic = this.profile_pic
        this.form.blocked = 0
        this.form.phone_number_verification_status = this.phone_number_verification_status



        if(this.usertype == 1){
          this.usercat = "Customer";
        }
        if(this.usertype == 2){
          this.usercat = "Owner";
        }
        if(this.usertype == 3){
          this.usercat = "Dealer/Company";
        }
        if(this.usertype == 4){
          this.usercat = "Lawyer";
        }
        this.email_verifyd = data.data.phone_number_verification_status;
        if(this.email_verifyd != 0){
          this.email_verify = true;
        }
        this.id_created_at = data.data.created_at;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

  onSubmitUpdate(): void {

    //console.log(this.form)
    this.authService.user_update(this.form, this.id).subscribe(
      data => {
        //console.log(data);
        window.location.reload();
      },
      err => {
        //console.log(err);
      }
    );
  }

}
