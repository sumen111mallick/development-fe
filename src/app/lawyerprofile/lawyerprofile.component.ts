import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { Title } from '@angular/platform-browser';
import { TokenStorageService } from './../_services/token-storage.service';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lawyerprofile',
  templateUrl: './lawyerprofile.component.html',
  styleUrls: ['./lawyerprofile.component.css']
})
export class LawyerprofileComponent implements OnInit {


  currentUser: any;
  email: any;
  usertype: any;
  usercat: any;
  profile_pic: any;
  email_verifyd: any;
  email_verify: boolean = false;
  id_created_at:any;
  phn_no
  company_name
  company_url
  address
  city
  other_mobile_number
  landline_number
  company_profile
  pan_number
  aadhar_number
  provided_service
  place_of_practice
  price_for_service
  law_firm_number
  practice_number
  content: {};
  ftpstring: string = GlobalConstants.ftpURL;
  id

  constructor(
    private tokenStorage: TokenStorageService,
    private titleService: Title,
    private userService: UserService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Profile Page');
    this.id = this.tokenStorage.getLawyer();
    this.authService.lawyer_get(this.id).subscribe(
      (data: any) => {
        console.log(data.data.name)
        this.content = data.data.data;
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

}
