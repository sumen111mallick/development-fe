import { Title } from '@angular/platform-browser';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminlawyerservices',
  templateUrl: './adminlawyerservices.component.html',
  styleUrls: ['./adminlawyerservices.component.css']
})
export class AdminlawyerservicesComponent implements OnInit {

  usertype: number;
  content;
  form: any = {};
  public showLoadingIndicator: boolean =false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private userService: UserService,
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.title.setTitle('Lawyer Services');
    this.usertype = this.tokenService.getUser().usertype;

    this.userService.adminGetLawyerServices().pipe().subscribe(
      (data: any) => {

        this.content = data.data;
        this.showLoadingIndicator = false;
        //console.log(data.data);

      },
      err => {
        //console.log(err)
        this.showLoadingIndicator = false;
      }
    )

  }

  view_func(id): void{
    this.tokenService.setLawyer(id);
    window.location.href=GlobalConstants.siteURL+"lawyerprofile"
  }

  del_func(id): void{
    {this.authService.lawyer_service_delete(id).subscribe(
        data => {
         // console.log(data)
        },
        err => {
          //console.log(err)
        }
      )
    }
  }

  onSubmit(): void {
      //console.log(this.form)
      this.showLoadingIndicator = true;
      this.authService.lawyer_create_service(this.form).subscribe(
        data => {
          //console.log(data)
          this.showLoadingIndicator = false;
          window.location.href=GlobalConstants.siteURL+"lawyerservice"
        },
        err => {
          this.showLoadingIndicator = false;
          //console.log(err.error);
        }
      );
  }

}
