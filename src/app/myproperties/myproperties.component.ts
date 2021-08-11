import { UserService } from './../_services/user.service';
import { GlobalConstants } from './../global-constants';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-myproperties',
  templateUrl: './myproperties.component.html',
  styleUrls: ['./myproperties.component.css']
})
export class MypropertiesComponent implements OnInit {

  showLoadingIndicator :boolean= false;
  content: [];
  ftpstring: string = GlobalConstants.ftpURL;
  usertype;
  contentLenght=null;

  constructor(
    private titleService: Title,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken() == null){
      this.redirect_to_home();      
    }
    this.titleService.setTitle('My Properties');
    this.usertype = this.tokenStorage.getUser().usertype;
  
    this.showLoadingIndicator = true;
    this.userService.getproperties().pipe().subscribe(
      (data: any) => {
        this.contentLenght=data.data.data.length;
        console.log(this.contentLenght);
        this.content = data.data.data;
        this.showLoadingIndicator = false;
        console.log(data.data.data);

      },
      err => {
        console.log(err)
      }
    )

  }

  del_func(id){
    {this.authService.property_delete(id).subscribe(
        data => {
          console.log(data)
          // window.location.reload();
        },
        err => {
          console.log(err)
        }
      );
    }
  }

  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
    }
  prod_func(data){
    this.tokenStorage.saveProdId(data);
    // this.myservice.setData(data);
    // this.router.navigate(["/productpage"])
  }
  property_details(id){
    console.log(id);
    this.router.navigate(["UdateProperty/", id]);
  }
}
