import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name: string[] = [] ;
  id: number;
  content: [] ;
  data: [] ;
  view_count;
  property_count

  constructor(
    private titleService: Title,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
  ) { }


  ngOnInit(): void {
    this.titleService.setTitle('Dashboard');
    this.name = this.tokenStorage.getUser().username;

    if(this.tokenStorage.getUser().usertype > 6){
      window.location.href=GlobalConstants.siteURL+"adminpanel"}


    this.userService.getdashboard().pipe().subscribe(
      (data: any) => {

        this.data = data;
        this.view_count = data['view_count'];
        this.property_count = data['property_count'];
        console.log(data);

      },
      err => {
        console.log(err)
      }
    )



  }

}
