import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { UserLogsService } from './../_services/user-logs.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  otp: any = {};
  isSuccessful = false;
  isVerified = false;
  isSignUpFailed = false;
  isFailedVerify = false;
  verify = false;
  public errorMessage: any = {};
  theFile: any = null;
  fileToUpload: File = null;
  imageURL: string;
  imgLink: any
  imgData: any
  image;
  number: string;
  showLoadingIndicator: boolean = false;
  select_type: string;	
  pro_id:any=null;
  type:any;
  device_info:any;
  browser_info:any;
  url_info:string;
  url: any;
  input_info:any=null;
  user_cart:any=null;
  ip_address:any; 
  ipAddress:string;		
  userEmail:any;
  email_id:any;
  first_name:any;		  

  constructor(private titleService: Title,
              private userlogs: UserLogsService,
              private authService: AuthService) 
           {  }

  ngOnInit(): void {
    //this.form.select_type = 2;
    this.titleService.setTitle('Register');      
    this.device_info  = this.userlogs.getDeviceInfo();
    this.browser_info = this.userlogs.getbrowserInfo();
    this.ip_address   = this.userlogs.getIpAddress();
    this.url_info  = this.userlogs.geturl();
  }

  onSubmit(): void {
    this.showLoadingIndicator = true;
    {
      this.authService.register_new(this.form).subscribe(

        data => {
          //console.log(data);
          this.isSuccessful = true;

          // user logss register timing
          if(data.status == 200){
            this.userEmail= data.data.email;
            this.type    = "registration_page";
            this.input_info= this.form;
            // console.log(this.ip_address);
            // console.log(this.device_info);
            // console.log(this.browser_info);
            // console.log(this.url_info);
            // console.log(this.type);
            // console.log(this.input_info);
            // console.log(this.userEmail);

            this.authService.user_logs(this.ip_address,this.device_info,this.browser_info,this.url_info,this.pro_id,this.type,this.userEmail,this.input_info,this.user_cart).subscribe(
              data => {
                console.log(data.status);
              });
          }
          this.isSignUpFailed = false;
          this.number = this.form.other_mobile_number;
          this.email_id = this.form.email;
          this.first_name = this.form.firstName;
          this.verify = true;
          //console.log(this.number);
          this.showLoadingIndicator = false;
        },
        err => {
          this.errorMessage = err.error;
          this.isSignUpFailed = true;
          //console.log(this.form);
          //console.log(err);
          //console.log(this.errorMessage);
          this.showLoadingIndicator = false;
        }
      );
    }
  }

  onSubmitotp(): void {
    {
      this.showLoadingIndicator = true;
      this.authService.verify(this.number, this.otp.password, this.email_id, this.first_name).subscribe(

        data => {
          //console.log(data);
          this.isVerified = true;
          this.verify = false;
          this.showLoadingIndicator = false;
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

  onFileChanged(event) {

    this.readThis(event.target)

  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      //console.log(myReader.result);
    }
    myReader.readAsDataURL(file);
  }

}
