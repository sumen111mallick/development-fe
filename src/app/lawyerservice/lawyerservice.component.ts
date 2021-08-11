import { GlobalConstants } from './../global-constants';
import { Title } from '@angular/platform-browser';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lawyerservice',
  templateUrl: './lawyerservice.component.html',
  styleUrls: ['./lawyerservice.component.css']
})
export class LawyerserviceComponent implements OnInit {

  usertype: number;
  content;
  form: any = {};

  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private userService: UserService,
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Lawyer Services');
    this.usertype = this.tokenService.getUser().usertype;

    this.userService.getLawyerServices().pipe().subscribe(
      (data: any) => {

        this.content = data.data;
        console.log(data.data);

      },
      err => {
        console.log(err)
      }
    )

  }

  del_func(id): void{
    {this.authService.lawyer_service_delete(id).subscribe(
        data => {
          console.log(data)
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  onSubmit(): void {
      console.log(this.form)
      this.authService.lawyer_create_service(this.form).subscribe(
        data => {
          console.log(data)
          window.location.href=GlobalConstants.siteURL+"lawyerservice"
        },
        err => {
          console.log(err.error);
        }
      );
  }

}
