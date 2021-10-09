import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConstants } from './../global-constants';

@Component({
  selector: 'app-tesimonial-form',
  templateUrl: './tesimonial-form.component.html',
  styleUrls: ['./tesimonial-form.component.css']
})
export class TesimonialFormComponent implements OnInit {
  review_form = new FormGroup({
    stars: new FormControl('', Validators.required),
    rev_subject: new FormControl('', Validators.required),
    rev_content: new FormControl('', Validators.required)
  });
  errorMessage: any;
  Message: any;
  public id:any;
  public ftpstring: string = GlobalConstants.ftpURL;
  public sitestring: string = GlobalConstants.siteURL;

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private router: Router,
    private route:ActivatedRoute,
    private toastr: ToastrService) {
      this.route.queryParams.subscribe((params) => {this.id = params.id;});
    }
  ngOnInit(): void {
  }
  onSubmit(): void {
    // Login check
    if(this.tokenStorage.getUser() != null){
    this.authService.create_review(this.review_form.value, this.id).subscribe(
      data => {
        this.review_form.reset();
        this.toastr.success('Reviews Succesfully', 'Property', {
          timeOut: 3000,
        });
      },
      err => {
        //console.log(err.error);
        this.errorMessage = err.error.errors;
        //console.log(this.errorMessage.length);
        this.Message = err.error.message;
        //console.log(this.Message);
        this.toastr.error(this.Message, 'Something Error', {
          timeOut: 3000,
        });
      }
    );
  }
  else{
    this.redirect_to_home();
  }
}
redirect_to_home(): void {
  window.location.href=GlobalConstants.siteURL="login"
}


}
