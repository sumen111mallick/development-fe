import { GlobalConstants } from './../global-constants';
import { Title } from '@angular/platform-browser';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lawyerpage',
  templateUrl: './lawyerpage.component.html',
  styleUrls: ['./lawyerpage.component.css']
})
export class LawyerpageComponent implements OnInit {

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

    this.userService.getLawyerServiceIndex().pipe().subscribe(
      (data: any) => {

        this.content = data.data;
        console.log(data.data);

      },
      err => {
        console.log(err)
      }
    )

  }

  view_func(id): void{
    this.tokenService.setLawyer(id);
    window.location.href=GlobalConstants.siteURL+"lawyerprofile"
  }

}
