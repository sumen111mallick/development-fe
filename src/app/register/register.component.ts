import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';

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

  constructor(private titleService: Title,
    private authService: AuthService) { }

  ngOnInit(): void {
    //this.form.select_type = 2;
    this.titleService.setTitle('Register');
  }

  onSubmit(): void {
    this.showLoadingIndicator = true;
    {
      this.authService.register_new(this.form).subscribe(

        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.number = this.form.other_mobile_number;
          this.verify = true;
          console.log(this.number);
          this.showLoadingIndicator = false;
        },
        err => {
          this.errorMessage = err.error;
          this.isSignUpFailed = true;
          console.log(this.form);
          console.log(err);
          console.log(this.errorMessage);
          this.showLoadingIndicator = false;
        }
      );
    }
  }

  onSubmitotp(): void {
    {
      this.authService.verify(this.number, this.otp.password).subscribe(

        data => {
          console.log(data);
          this.isVerified = true;
          this.verify = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.verify = true;
          this.isFailedVerify = true;
          console.log(err);
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
      console.log(myReader.result);
    }
    myReader.readAsDataURL(file);
  }

}
