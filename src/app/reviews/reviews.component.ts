import { GlobalConstants } from './../global-constants';
import { Router } from '@angular/router';
import { UserService } from './../_services/user.service';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  content: [];
  ftpstring: string = GlobalConstants.ftpURL;
  usertype;
  public showLoadingIndicator: boolean =false;

  constructor(
    private titleService: Title,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.titleService.setTitle('My Properties');
    this.usertype = this.tokenStorage.getUser().usertype;

    this.userService.get_review().pipe().subscribe(
      (data: any) => {

        this.content = data.data;
        this.showLoadingIndicator = false;
        
        //console.log(data);

      },
      err => {
        //console.log(err)
        this.showLoadingIndicator = false;
      }
    )

  }

  del_func(id){
    this.showLoadingIndicator = true;
    {this.authService.property_delete(id).subscribe(

        data => {
          //console.log(data)
          this.showLoadingIndicator = false;
          window.location.reload();
        },
        err => {
          //console.log(err)
          this.showLoadingIndicator = false;
        }
      );
    }
  }

  prod_func(data){
    this.tokenStorage.saveProdId(data);
    // this.myservice.setData(data);
    // this.router.navigate(["/productpage"])
  }


}
