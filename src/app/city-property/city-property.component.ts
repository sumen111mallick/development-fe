import { Component, OnInit } from '@angular/core';
import { AuthService } from './../_services/auth.service';
import { GlobalConstants } from './../global-constants';
import { TokenStorageService } from './../_services/token-storage.service';

@Component({
  selector: 'app-city-property',
  templateUrl: './city-property.component.html',
  styleUrls: ['./city-property.component.css']
})
export class CityPropertyComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
  }
  property_search(event: any): void{
    if (this.tokenStorage.getToken() != null){
      //console.log(event)
      this.authService.city_search_login(event).subscribe(
        data => {
          this.tokenService.searchData(data);
          // console.log(this.tokenService.returnSearch());
          window.location.href=GlobalConstants.siteURL+"productlisting"
        },
        err => {
          //console.log(err.error.message);
        }
      );

    }else{
      //console.log(event)
      this.authService.city_search(event).subscribe(
        data => {
          this.tokenService.searchData(data);
          // console.log(this.tokenService.returnSearch());
          window.location.href=GlobalConstants.siteURL+"productlisting"
        },
        err => {
          //console.log(err.error.message);
        }
      );
    }
  }

}
