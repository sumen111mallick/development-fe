import { Router } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { Title } from '@angular/platform-browser';
import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-savedsearches',
  templateUrl: './savedsearches.component.html',
  styleUrls: ['./savedsearches.component.css']
})
export class SavedsearchesComponent implements OnInit {

  content: [];
  ftpstring: string = GlobalConstants.ftpURL;

  constructor(
    private titleService: Title,
    private tokenService: TokenStorageService,
    private authService : AuthService,
    private router: Router,
    private userService: UserService

  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('SavedSearch');
    if(this.tokenService.getUser() != null)
    {
      {this.userService.getSearch().pipe().subscribe(
          data => {
              console.log(data.data)
              this.content = data.data;
            },
          err => {
              console.log(err)
            }
        )
      }
    }
    else{
      this.router.navigate([`/login`]);
    }

  }
  prod_func(data){
    this.tokenService.saveProdId(data);
    // this.myservice.setData(data);
    // this.router.navigate(["/productpage"])
  }


}
