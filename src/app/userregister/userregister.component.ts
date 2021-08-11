import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {

  form: any = {};
  otp: any = {};
  isSuccessful = false;
  isVerified = false;
  isSignUpFailed = false;
  isFailedVerify = false;
  verify = false;
  errorMessage = '';
  theFile: any = null;
  fileToUpload: File = null;
  imageURL:string;
  imgLink         : any
  imgData         : any
  image;
  number:string


  public constructor(
    private titleService: Title,
    private authService: AuthService) {

  }





  ngOnInit(): void {
    this.titleService.setTitle('Register');

  }

  onSubmit(): void {
    {this.authService.register(this.form, this.image ).subscribe(

      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.number = this.form.other_mobile_number;
        this.verify = true;
        console.log(this.number)
      },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          console.log(this.form,this.fileToUpload);
          console.log(err);
        }
      );
    }
  }

  onSubmitotp(): void {
    {this.authService.verify(this.number, this.otp.password ).subscribe(

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


  onFileChanged(event){

    this.readThis(event.target)

  }
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(myReader.result);
    }
    myReader.readAsDataURL(file);
  }


}
