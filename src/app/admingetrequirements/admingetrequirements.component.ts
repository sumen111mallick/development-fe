import { Title } from '@angular/platform-browser';
import { TokenStorageService } from './../_services/token-storage.service';
import { UserService } from './../_services/user.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admingetrequirements',
  templateUrl: './admingetrequirements.component.html',
  styleUrls: ['./admingetrequirements.component.css']
})
export class AdmingetrequirementsComponent implements OnInit {

  usertype: number;
  content;
  form: any = {};
  public showLoadingIndicator: boolean =false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private tokenService: TokenStorageService,
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.title.setTitle('Lawyer Services');
    this.usertype = this.tokenService.getUser().usertype;

    this.userService.adminGetAdminReview().pipe().subscribe(
      (data: any) => {

        this.content = data.data.data;
        this.showLoadingIndicator = false;
        //console.log(data.data.data);

      },
      err => {
        this.showLoadingIndicator = false;
       // console.log(err)
      }
    )
  }

  del_func(id): void{
    this.showLoadingIndicator = true;
    {this.authService.requirement_delete(id).subscribe(
        data => {
          //console.log(data)
          this.showLoadingIndicator = false;
          window.location.reload();
        },
        err => {
          this.showLoadingIndicator = false;
          //console.log(err)
        }
      )
    }
  }

  user_func(id): void{
    this.showLoadingIndicator = true;
    {this.authService.requirement_delete(id).subscribe(
        data => {
          this.showLoadingIndicator = false;
          //console.log(data)
        },
        err => {
          this.showLoadingIndicator = false;
          //console.log(err)
        }
      )
    }
  }

}
