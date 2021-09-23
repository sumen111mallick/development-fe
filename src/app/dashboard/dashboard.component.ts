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
  public view_count:number=0;
  public property_count:number=0;
  public wishlist_count:number=0;
  public solid_Lenght:number=0;
  public showLoadingIndicator: boolean =false;

  constructor(
    private titleService: Title,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
  ) { }


  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.titleService.setTitle('Dashboard');
    this.name = this.tokenStorage.getUser().username;
    this.property_solid();

    if(this.tokenStorage.getUser().usertype == 11) {
      window.location.href=GlobalConstants.siteURL + "adminpanel";
    } else if (this.tokenStorage.getUser().usertype == 8) {
      window.location.href=GlobalConstants.siteURL + "internal-users-panel";
    }


    this.userService.getdashboard().pipe().subscribe(
      (data: any) => {

        this.data = data;
        this.view_count = data['view_count'];
        this.property_count = data['property_count'];
        this.wishlist_count =data['wishlist_count'];
        this.showLoadingIndicator = false;
        //console.log(data);

      },
      err => {
        //console.log(err)
        this.showLoadingIndicator = false;
      }
    )

  }
  property_solid(){
    this.userService.getproperties_solid().pipe().subscribe(
      (data: any) => {
        this.solid_Lenght=data.data.length;
        console.log(this.solid_Lenght);

      },
      err => {
        //console.log(err)
      });

  }

}


