import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';
import { Title } from '@angular/platform-browser';
import { TokenStorageService } from './../_services/token-storage.service';
import { GlobalConstants } from './../global-constants';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { AuthService } from './../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
// import { NgxPaginationModule } from 'ngx-pagination';
// import {GetAveragePipe} from '../get-average.pipe';
@Component({
  selector: 'app-localservice',
  templateUrl: './localservice.component.html',
  styleUrls: ['./localservice.component.css']
})
export class LocalserviceComponent implements OnInit {

  public showLoadingIndicator: boolean =false;
  public local_area_data:any;
  public area_service_data:any;
  public search_data:any;
  public UserDeatils:any;
  public review_data:any;
  selected_testimonial: string[];
  user_id:number;
 public totalVal: number=0;

  Service_form = new FormGroup({
    Area: new FormControl('470', Validators.required),
    LocalArea: new FormControl('', Validators.required),
    service: new FormControl('', Validators.required)
  });
  review_form = new FormGroup({
    stars: new FormControl('', Validators.required),
    user_id:new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    s_user_id: new FormControl('', Validators.required)
  });

  err_caused: boolean;
  errorMessage: any;
  constructor(
    private titleService: Title,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder,
    public authservice:AuthService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken() == null){
      this.redirect_to_home();      
    }
    this.showLoadingIndicator = true;
    this.local_area();
    this.area_service();
    this.On_Search();
    
    this.selected_testimonial = new Array<string>();
  }

  local_area():void{
    this.showLoadingIndicator = true;
    this.userService.getlocalArea().pipe().subscribe(
      (data: any) => {
        this.local_area_data=data.data;
        this.showLoadingIndicator = false;
        // console.log(data.data);
      },
      err => {
        //console.log(err)
       this.showLoadingIndicator = false;
      }
    )
  }
  onchange_area(id: any) {
    this.authservice.get_localareaby_id(id).subscribe(
      data => {
        this.local_area_data=data.data;
        this.Service_form.patchValue({
          LocalArea:'',
        });
        this.Service_form.patchValue({
          service:'',
        });
        // console.log( this.Service_form.value);
      },
      err => {
        // console.log(err);

      }
    );
  }
  
  area_service():void{
    this.showLoadingIndicator = true;
    this.userService.getarea_service().pipe().subscribe(
      (data: any) => {
        this.area_service_data=data.service_data;
        this.showLoadingIndicator = false;
        // console.log(data.data);
      },
      err => {
        //console.log(err)
       this.showLoadingIndicator = false;
      }
    )
  }
  onchange_local_area(id: any) {
    // console.log(id);
     this.authservice.get_service_id(id).subscribe(
       data => {
         this.area_service_data=data.data;
         this.Service_form.patchValue({
           service:'',
         });
        //  console.log( this.Service_form.value.service);
       },
       err => {
         // console.log(err);
       }
     );
   }
   On_Search(){
    this.showLoadingIndicator = true;
    this.authservice.searching_area(this.Service_form.value).subscribe(
      data => {
        this.search_data = data.data;
        this.showLoadingIndicator = false;
        // console.log(this.search_data);
        // this.toastr.success('Successfuly Saved', 'Property Sales');
        // window.location.href = GlobalConstants.siteURL + "myproperties"
      },
      err => {
        this.showLoadingIndicator = false;
        this.err_caused = true;
        this.errorMessage = err.error.errors;
        // console.log(this.errorMessage);
        this.toastr.error(this.errorMessage, 'Something Error', {
          timeOut: 3000,
        });
      }
    );

  }
  
  // user details fetch 
  user_details(id):void{
    this.review_form.reset();
    this.authservice.getarea_user_details(id).pipe().subscribe(
      (data: any) => {
        this.UserDeatils=data.user_data;
        // console.log(data);
        this.review_data= data.review_data;
        this.showLoadingIndicator = false; 
        this.review_form.patchValue({
          s_user_id:data.user_data.user_id,
        });
        if(data.user_review != null){
          this.review_form.patchValue({
            s_user_id:data.user_review.s_user_id,
            content:data.user_review.content,
            user_id:data.user_review.user_id,
            stars:data.user_review.stars,
          });
        }
        this.On_Search();
      },
      err => {
        //console.log(err)
       this.showLoadingIndicator = false;
      }
    )
  } 
  submit_review():void{
    console.log(this.review_form.value);
    if (this.review_form.value.stars) {
      if(this.review_form.value.content){
        this.authservice.service_user_reviews(this.review_form.value).subscribe(
          data => {
            this.showLoadingIndicator = false;
            this.toastr.success('Successfuly Reviews For Service');
            this.user_details(data.data);
          },
          err => {
            this.showLoadingIndicator = false;
            this.err_caused = true;
            this.errorMessage = err.error.errors;
            // console.log(this.errorMessage);
            this.toastr.error(this.errorMessage, 'Something Error', {
              timeOut: 3000,
            });
          }
        );
      }else{
        this.toastr.error("Please Enter Details");
      }
    }else{
      this.toastr.error("Please Select Stars rating");
    }

  }
  
  // redicect to login page
  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
    }

}
