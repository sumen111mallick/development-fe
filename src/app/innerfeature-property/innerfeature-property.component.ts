import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';

@Component({
  selector: 'app-innerfeature-property',
  templateUrl: './innerfeature-property.component.html',
  styleUrls: ['./innerfeature-property.component.css']
})
export class InnerfeaturePropertyComponent implements OnInit {
  public feature_property_data:any;
  public feature_pro_length:number=0;
  public ftpstring: string = GlobalConstants.ftpURL;
  public sitestring: string = GlobalConstants.siteURL;
  public e:any;

  constructor(
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.feature_property();
  }
  
feature_property(){
  this.userService.feature_property().subscribe(
    data => { 
      //console.log(data);
      this.feature_property_data = data.data; 
      this.feature_pro_length =  this.feature_property_data.length;  
    }
  );
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
