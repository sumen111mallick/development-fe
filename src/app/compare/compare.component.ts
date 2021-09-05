import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Router } from '@angular/router';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  sitestring:string = GlobalConstants.siteURL;
  prod_id1: any;
  prod_id2: any;

  product_data1: [];
  user_data1: [];
  product_data2: [];
  user_data2: [];
  product_data3: [];
  user_data3: [];
  ftpstring: string = GlobalConstants.ftpURL;
  public property_comp_length:number=0;
  property_comp:any={};
  content:any={};
  showLoadingIndicator = false;
  public amenitiesresult:any={};
  e: any={};


  constructor(
    private router: Router,
    private idService: TokenStorageService,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private tokenStorage: TokenStorageService,
  ) { 
      if (this.tokenStorage.getToken() == null){
        this.redirect_to_login();    
      }
    }


  ngOnInit(): void {
    this.pro_comp();
    this.amenities();

  }
  pro_comp(): void{
    this.showLoadingIndicator = true;
    this.userService.get_pro_comp().pipe().subscribe(
      (data: any) => {
        this.property_comp = data.data;
        this.property_comp_length=this.property_comp.length;
        //console.log(this.property_comp[0].amenities);
        //console.log(this.property_comp);
        //console.log(this.property_comp_length);
        this.pro_comp_refresh();
        if(this.property_comp_length <2){
            this.toastr.warning('Comparision Minimun Two','Property', {
              timeOut: 4000,
            });
            this.redirect_to_home();
         }
        this.showLoadingIndicator = false;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  amenities(): void{
    this.userService.getamenitiesdata().pipe().subscribe(
      (amenitiesdata: any) => {
        //  console.log(amenitiesdata);
        this.amenities = amenitiesdata.data;
        this.amenitiesresult = this.amenities;
        //console.log(this.amenitiesresult);
        //console.log(this.content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  Amenties_funtion(Amenties_id:any,pro_id: any){
    // var len= this.product_amenties.length;
  if(this.property_comp_length !=null){
    for (let i = 0; i < this.property_comp.length; i++) {
      if(this.property_comp[i].product_id==pro_id){
        for(let j=0;j< this.property_comp[i].amenities.length; j++){
          if(Amenties_id==this.property_comp[i].amenities[j].amenties){
            return  true;
          }
        }
      }
    }
  }
}
  delete_comp(id:number):void{
    //console.log(id);
    this.showLoadingIndicator = true;
    this.authService.pro_comp_delete(id).subscribe(
        data => {
        //console.log(data); 
        this.pro_comp();
        // this.showLoadingIndicator = false;
        },
        err => {
          //console.log(err)
        }
      );
  }
  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL
  }
  
  redirect_to_login(): void {
    window.location.href=GlobalConstants.siteURL="login"
  }
   // topbar proeprty comparion functionalty
   pro_comp_refresh(){
    this.userService.pro_comp_emit<string>('true');
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
  onShare1(){
    alert("Your Shareable Link is \n" + this.sitestring + this.router.url + "?id=" + this.prod_id1);
  }
  onShare2(){
    alert("Your Shareable Link is \n" + this.sitestring + this.router.url + "?id=" + this.prod_id2);
  }



}
