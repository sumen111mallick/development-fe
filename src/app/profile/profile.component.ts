import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { GlobalConstants } from './../global-constants';
import { Title } from '@angular/platform-browser';
import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  email: any;
  usertype: any;
  usercat: any;
  profile_pic: any;
  email_verifyd: any;
  email_verify: boolean = true;
  id_created_at: any;
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
  phone_number_verification_status
  content: {};
  form: any = {};
  formd: any = {};
  id;
  // public message: any;
  public imagePath: any;
  public imgURL: any;
  public files: any;
  public message: any = {};
  public errorMessage: any;
  public otp_visible: boolean = false;
  public phone_number: any;
  public isVerified: boolean = false;
  public verify: boolean = false;
  public isFailedVerify: boolean = false;
  public otp: any = {};
  public response: any;
  public updateFailed: boolean = false;
  public alert: boolean = false;

  ftpstring: string = GlobalConstants.ftpURL;

  public showLoadingIndicator: boolean =false;
  isLoggedIn: boolean;

  constructor(
    private token: TokenStorageService,
    private titleService: Title,
    private userService: UserService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    /*if (this.tokenStorage.getUser() != null) {
      this.isLoggedIn = true
      console.log(this.isLoggedIn)
    }
    else {
      this.redirect_to_home();
    } */
    this.titleService.setTitle('Profile Page');
    this.LoginUser_Data();

  }
  LoginUser_Data(): void {
    this.showLoadingIndicator = true;
    this.userService.getUserBoard().pipe().subscribe(
      (data: any) => {
        //console.log(data)
        this.content = data;
        this.id = data.id;
        this.currentUser = data.name;
        this.profile_pic = data.profile_pic;
        this.email = data.email;
        this.usertype = data.usertype;
        this.phn_no = data.other_mobile_number;
        this.company_name = data.company_name;
        this.company_url = data.company_url;
        this.address = data.address;
        this.city = data.city;
        this.landline_number = data.landline_number;
        this.company_profile = data.company_profile;
        this.pan_number = data.pan_number;
        this.aadhar_number = data.aadhar_number;
        this.provided_service = data.provided_service;
        this.place_of_practice = data.place_of_practice;
        this.price_for_service = data.price_for_service;
        this.law_firm_number = data.law_firm_number;
        this.practice_number = data.practice_number;
        this.email_verifyd = data.phone_number_verification_status;
        //console.log(this.email_verifyd);
        if (this.email_verifyd != 0) {
          this.email_verify = true;
        }
        else if (this.email_verifyd == 0) {
          this.email_verify = false;
        }
        this.id_created_at = data.created_at;
        //console.log(this.content);
        
        /*if (this.profile_pic.indexOf('googleusercontent.com') == -1) {
          this.profile_pic = this.ftpstring + this.profile_pic
        } */
        
        switch (this.usertype) {
          case 3: {
            this.usercat = "Agent";
            break;
          }
          case 4: {
            this.usercat = "Builder";
            break;
          }
          case 5: {
            this.usercat = "Individual";
            break;
          }
          case 8: {
            this.usercat = "Internal User";
            break;
          }
          case 11: {
            this.usercat = "Admin";
            break;
          }
          default: {
            break;
          }
        }
        this.showLoadingIndicator = false;

        /*if (this.email_verifyd != 0) {
          this.email_verify = true;
        }
        this.id_created_at = data.created_at;
        console.log(this.content);*/
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.showLoadingIndicator = false;
      }
    )

  }

  showSuccess($text) {
    this.toastr.success($text);
  }

  user_details(data): void {
    this.showLoadingIndicator = true;
    this.authService.user_get(this.id).subscribe(
      (data: any) => {
        //console.log(data)
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


        if (this.usertype == 3) {
          this.usercat = "Agent";
        }
        if (this.usertype == 4) {
          this.usercat = "Builder";
        }
        if (this.usertype == 5) {
          this.usercat = "Individual";
        }

        this.email_verifyd = data.data.phone_number_verification_status;
        if (this.email_verifyd != 0) {
          this.email_verify = true;
        }
        else if (this.email_verifyd == 0) {
          this.email_verify = false;
        }
        this.id_created_at = data.data.created_at;
      },
      err => {
        this.content = err.error.message;
      }
    )
    this.showLoadingIndicator = false;
  }


  redirect_to_home(): void {
    window.location.href = GlobalConstants.siteURL = "login"
  }

  onSubmitUpdate(): void {
    console.log(this.phn_no);
    if (this.form.other_mobile_number && this.form.other_mobile_number == this.phn_no) {
      this.alert = true;
    }
    else {
      this.alert = false;
      if (this.form.username || this.form.other_mobile_number) {
        this.showLoadingIndicator = true;
        console.log(this.form.username);
        console.log(this.form.other_mobile_number);
        this.authService.user_update(this.form, this.id).subscribe(
          data => {
            console.log(data);
            this.response = data;
            if (this.form.other_mobile_number) {
              this.otp_visible = true;
              this.phone_number = this.form.other_mobile_number;
            }
            else {
              this.showSuccess(this.response.message);
              window.location.reload();
            }
            this.showLoadingIndicator = false;
          },
          err => {
            this.updateFailed = true;
            console.log(err);
            this.errorMessage = err.error;
            this.showLoadingIndicator = false;
          }
        );
      }
      else{
        this.toastr.error("Please enter any one value");
      }

    }
  }


  onSubmitotp(): void {
    {
      console.log(this.otp.password);
      this.showLoadingIndicator = true;
      this.authService.verify_profile_mobile(this.phone_number, this.otp.password, this.id).subscribe(

        data => {
          this.response = data;
          console.log(data);
          this.isVerified = true;
          this.verify = false;
          this.showLoadingIndicator = false;
          this.showSuccess(this.response.message);
          window.location.reload();
        },
        err => {
          this.errorMessage = err.error.message;
          this.verify = true;
          this.isFailedVerify = true;
          this.showLoadingIndicator = false;
          //console.log(err);
        }
      );
    }
  }

  onSubmitChange(): void {
    //console.log(this.form)
    this.showLoadingIndicator = true;
    this.authService.password_update(this.form).subscribe(
      data => {
        //console.log(data);
        // window.location.reload();
        this.message = data.message;
        if (data.status == 200) {
          this.form.old_password = "";
          this.form.new_password = "";
          this.form.confirm_password = "";
          this.toastr.success(this.message, 'Password', {
            timeOut: 3000,
          });
        } else {
          this.toastr.error(this.message, 'Error', {
            timeOut: 3000,
          });
        }
        this.showLoadingIndicator = false;
      },
      err => {
        //console.log(err);
        this.message = err.message;
        this.showLoadingIndicator = false;
        this.toastr.error(this.message, 'Error', {
          timeOut: 3000,
        });
      }
    );
  }

  onFileChange(event) {
    //console.log(event);
    this.files = event.target.files;
    if (this.files.length === 0)
      return;

    const mimeType = this.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    const reader = new FileReader();
    //console.log(reader);
    this.imagePath = this.files;
    //console.log(this.imagePath);
    reader.readAsDataURL(this.files[0]);
    reader.onload = (event) => {
      this.imgURL = event.target.result;
    }
  }

  upload_image() {
    //console.log(this.files[0]);
    //console.log(this.id);
    var formData: any = new FormData();
    formData.append('profile_image', this.files[0], this.files[0].name);
    formData.append('id', this.id);
    //console.log(formData);
    this.showLoadingIndicator = true;
    this.authService.uploadProfile_Image(formData).subscribe(
      data => {
        //console.log(data);
        this.showLoadingIndicator = false;
        this.toastr.success(data.message);
        setTimeout('window.location.reload()', 2000);

      },
      err => {
        this.showLoadingIndicator = false;
        //console.log(err);
      }
    );
  }


}
