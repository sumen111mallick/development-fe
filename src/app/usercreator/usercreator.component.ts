import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usercreator',
  templateUrl: './usercreator.component.html',
  styleUrls: ['./usercreator.component.css']
})
export class UsercreatorComponent implements OnInit {

  form: any = {};
  otp: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  theFile: any = null;
  fileToUpload: File = null;
  imageURL:string;
  imgLink         : any
  imgData         : any
  image;
  number:string
  verify = false;
  isFailedVerify = false;
  isVerified = false;

  userVisible: boolean = true;
  ownerVisible: boolean = false;
  dealerVisible: boolean = false;
  lawyerVisible: boolean = false;
  companyVisible: boolean = false;



  public constructor(
    private titleService: Title,
    private authService: AuthService) {

  }





  ngOnInit(): void {
    this.titleService.setTitle('Register');

  }

  onSubmitUser(): void {
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

  onSubmitOwner(): void {
    {this.authService.register_owner(this.form, this.image ).subscribe(

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

  onSubmitDealer(): void {
    {this.authService.register_dealer(this.form, this.image ).subscribe(

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

  onSubmitLawyer(): void {
    {this.authService.register_lawyer(this.form, this.image ).subscribe(

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

  onSubmitCompany(): void {
    {this.authService.register_company(this.form, this.image ).subscribe(

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


  userButton(){
    this.userVisible = true;
    this.ownerVisible = false;
    this.dealerVisible = false;
    this.lawyerVisible = false;
    this.companyVisible = false;
  }

  ownerButton(){
    this.userVisible = false;
    this.ownerVisible = true;
    this.dealerVisible = false;
    this.lawyerVisible = false;
    this.companyVisible = false;
  }

  dealerButton(){
    this.userVisible = false;
    this.ownerVisible = false;
    this.dealerVisible = true;
    this.lawyerVisible = false;
    this.companyVisible = false;
  }

  lawyerButton(){
    this.userVisible = false;
    this.ownerVisible = false;
    this.dealerVisible = false;
    this.lawyerVisible = true;
    this.companyVisible = false;
  }

  companyButton(){
    this.userVisible = false;
    this.ownerVisible = false;
    this.dealerVisible = false;
    this.lawyerVisible = false;
    this.companyVisible = true;
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
