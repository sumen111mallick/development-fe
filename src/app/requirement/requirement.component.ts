import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent implements OnInit {

  content: [];
  form: any = {};
  ftpstring: string = GlobalConstants.ftpURL;
  user_id: string;
  reqSubmitted: boolean = false;
  errors: any = {};
  loginCheck:boolean = false;

  constructor(
    private titleService: Title,
    private tokenService: TokenStorageService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Requirements');
    if(this.tokenService.getToken())
    {
      console.log(this.tokenService.getUser())
      this.user_id = this.tokenService.getUser().id
      this.loginCheck = true;
    }

    this.authService.requirement_index(this.user_id).subscribe(
      data => {
        this.content = data.requirements.data
        console.log(data.requirements.data)
      }
    )
  }

  onSubmit(): void{
    console.log(this.form)
    this.authService.requirements(this.form, this.user_id).subscribe(
      data => {
        this.reqSubmitted = true;
        console.log(data)
        this.userService.getrequirements().pipe().subscribe(
          (data: any) => {
            this.content =data.data.data;
            console.log(this.content)
            window.location.reload();
          }
        );
      },
      err => {
        console.log(err.error);
      }
    );
  }

}
