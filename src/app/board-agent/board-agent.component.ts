import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-agent',
  templateUrl: './board-agent.component.html',
  styleUrls: ['./board-agent.component.css']
})
export class BoardAgentComponent implements OnInit {

  form: any = {};
  otp: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  error_cause: any = [];
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

  ownerVisible: boolean = true;
  dealerVisible: boolean = false;
  lawyerVisible: boolean = false;



  public constructor(
    private titleService: Title,
    private authService: AuthService) {

  }





  ngOnInit(): void {
    this.titleService.setTitle('Register');

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
          this.error_cause = err.error.errors;
          this.isSignUpFailed = true;
          console.log(this.form,this.fileToUpload);
          console.log(err);
          console.log(this.error_cause)
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
          this.error_cause = err.error.errors;
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
          this.error_cause = err.error.errors;
          this.isSignUpFailed = true;
          console.log(this.form,this.fileToUpload);
          console.log(err);
        }
      );
    }
  }


  ownerButton(){
    this.ownerVisible = true;
    this.dealerVisible = false;
    this.lawyerVisible = false;
  }

  dealerButton(){
    this.ownerVisible = false;
    this.dealerVisible = true;
    this.lawyerVisible = false;
  }

  lawyerButton(){
    this.ownerVisible = false;
    this.dealerVisible = false;
    this.lawyerVisible = true;
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
          this.error_cause = err.error.errors;
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
