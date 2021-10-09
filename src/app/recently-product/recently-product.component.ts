import { Component, OnInit } from '@angular/core';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { GlobalConstants } from './../global-constants';
@Component({
  selector: 'app-recently-product',
  templateUrl: './recently-product.component.html',
  styleUrls: ['./recently-product.component.css']
})
export class RecentlyProductComponent implements OnInit {
  public Recently_UserData:any;
  public Recent_user_length:any;
  public isLoggedIn:boolean=false;
  public e:any;
  public ftpstring: string = GlobalConstants.ftpURL;
  public sitestring: string = GlobalConstants.siteURL;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken() != null){
      this.isLoggedIn = true;
      this.recently_propertry();
    }
  }
  
  recently_propertry(){
    this.authService.recently_view().subscribe(
      data => {
        this.Recently_UserData = data.data;
        this.Recent_user_length=data.data.length;
         //console.log(this.Recently_UserData);
      });
   }
   
// pricre convert functionalty
Price_convert(num: number) {
  if (num >= 1000000000) {
     return (num / 1000000000).toFixed(2).replace(/\.0$/, '') + 'G';
  }
  if (num >= 10000000) {
    return (num / 10000000).toFixed(2).replace(/\.0$/, '') + 'Crore';
  }
  if (num >= 100000) {
    return (num / 100000).toFixed(2).replace(/\.0$/, '') + 'Lac';
  }
  if (num >= 1000) {
    this.e=num;
    var t = (this.e = this.e ? this.e.toString() : "").substring(this.e.length - 3)
    , n = this.e.substring(0, this.e.length - 3);
    return "" !== n && (t = "," + t),
    n.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + t
  }
  return num;
}

}
