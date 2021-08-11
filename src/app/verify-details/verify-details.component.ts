import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from './../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-details',
  templateUrl: './verify-details.component.html',
  styleUrls: ['./verify-details.component.css']
})
export class VerifyDetailsComponent implements OnInit {

  currentUser: any;
  currentUserId: any;
  verify: boolean = false;
  errorMessage: string;
  number: string;
  isVerified: boolean = false;
  isFailedVerify: boolean = false;
  isFailedVerify_otp: boolean = false;
  showLoadingIndicator: boolean =false;
  submitted: boolean = false;
  otp_submitted: boolean = false;

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  verifyForm = this.fb.group({
    form_phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
  });

  otpForm = this.fb.group({
    otp_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  get f() {
    return this.verifyForm.controls;
  }

  get g() {
    return this.otpForm.controls;
  }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.userService.getUserBoard().pipe().subscribe(
      (data: any) => {
        this.currentUser = data.name;
        this.currentUserId = data.id;
        this.showLoadingIndicator = false;
      },
      err => {
        console.log(err);
        this.showLoadingIndicator = false;
      }
      );
    
  }

  onSubmit() {
    this.showLoadingIndicator = true;
    console.log("Submitted");
    console.log(this.verify);
    this.submitted = true;

    if (this.verifyForm.invalid) {
      this.showLoadingIndicator = false;
      return;
    }

    this.authService.mobile_verify(this.verifyForm.value).subscribe(
      data => {
        console.log(data);
        this.verify = true;
        console.log(this.verify);
        this.number = this.verifyForm.value.form_phone;
        this.showLoadingIndicator = false;
      },
      err => {
        this.errorMessage = err.error;
        this.isFailedVerify = true;
        console.log(err);
        this.showLoadingIndicator = false;
      }
    );
  }

  onSubmitotp(): void {
    {
      this.showLoadingIndicator = true;
      this.otp_submitted = true;

      if (this.otpForm.invalid) {
        this.showLoadingIndicator = false;
        return;
      }
      this.authService.verify_mobile(this.number, this.otpForm.value.otp_password, this.currentUserId).subscribe(

        data => {
          console.log(data);
          this.isVerified = true;
          this.verify = false;
          this.router.navigateByUrl('profile');
          this.showLoadingIndicator = false;
        },
        err => {
          this.errorMessage = err.error;
          this.verify = true;
          this.isFailedVerify_otp = true;
          console.log(err);
          this.showLoadingIndicator = false;
        }
      );
    }
  }

}
