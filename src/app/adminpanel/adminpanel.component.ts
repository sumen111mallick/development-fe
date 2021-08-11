import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { Title } from '@angular/platform-browser';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  name: string[] =[];
  view_count
  review_count
  property_count
  user
  product
  events
  showLoadingIndicator;

  constructor(
    private titleservice: Title,
    private userService: UserService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
  ) {}

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.titleservice.setTitle('Admin Panel')
    if(this.tokenStorage.getUser().usertype < 6)
      this.panel_check();
    this.name = this.tokenStorage.getUser().username;

    this.userService.getAdmin_users().pipe().subscribe(
      data => {
        this.user = data.data
        console.log(data.data)
      },
      err => {
        console.log(err)
      }
    )

    this.userService.getAdmin_product().pipe().subscribe(
      data => {
        this.product = data.data
        console.log(data.data)

      },
      err => {
        console.log(err)
      }
    )

    this.userService.getAdmin_productviews().pipe().subscribe(
      data => {
        this.view_count = data.data
        console.log(data.data)

      },
      err => {
        console.log(err)
      }
    )

    this.userService.getAdmin_reviewcount().pipe().subscribe(
      data => {
        this.review_count = data.data
        console.log(data.data)

      },
      err => {
        console.log(err)
      }
    )

    this.userService.getadminevents().pipe().subscribe(
      (data: any) => {

        this.events = data.data.data;
        console.log(this.events);
        //console.log(this.content);
      },
      err => {
        this.events = JSON.parse(err.error).message;
        console.log(err);
      }
    );
    this.showLoadingIndicator = false;
  }

  panel_check(){
    window.location.href=GlobalConstants.siteURL="profile"
  }

}
