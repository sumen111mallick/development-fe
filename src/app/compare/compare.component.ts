import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Router } from '@angular/router';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  [x: string]: any;

  sitestring:string = GlobalConstants.siteURL;
  prod_id1: any;
  prod_id2: any;
  
  screenWidth: number;

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
  public devicetype:number;
  public  amenties_uncheck: any = [];
  product_amenties:any=[];
  public unique_ameties:any=[];
  filter_amenties:any=[];


  constructor(
    private router: Router,
    private idService: TokenStorageService,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private tokenStorage: TokenStorageService,
  ) { 
      this.getScreenSize();
      if (this.tokenStorage.getToken() == null){
        this.redirect_to_login();    
      }
    }


  ngOnInit(): void {
    this.pro_comp();

  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <768){
      this.devicetype=2;
    }else{
      this.devicetype=4;
    }
 }
  pro_comp(): void{
    this.showLoadingIndicator = true;
    this.userService.get_pro_comp().pipe().subscribe(
      (data: any) => {
        this.property_comp = data.data;
        this.property_comp_length=this.property_comp.length;
          for(let i=0;i<this.property_comp.length;i++){
            if(i<this.devicetype){
              for(let j=0;j<this.property_comp[i].amenities.length;j++){
                this.product_amenties.push(this.property_comp[i].amenities[j].amenties);
              }
            }
          }
          // console.log(this.product_amenties);
        const expected = new Set();
        const unique = this.product_amenties.filter(item => !expected.has(JSON.stringify(item)) ? expected.add(JSON.stringify(item)) : false);
        this.unique_ameties=unique;
        // console.log(this.unique_ameties);
        this.amenities();
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
        this.amenities = amenitiesdata.data;
        console.log(this.amenities.length);
        for(let i=0; i<this.amenities.length;i++){
          if (this.filter_amenties_fun(this.amenities[i].id)) {
            this.filter_amenties.push(this.amenities[i]);
          }
        }
        this.amenitiesresult = this.filter_amenties;
        console.log(this.amenitiesresult);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  filter_amenties_fun(amenties_id:any){
    if(this.unique_ameties.length !=null){
      for (let i=0; i<this.unique_ameties.length; i++) {
        if(this.unique_ameties[i]==amenties_id){
          console.log(amenties_id);
           return true;
          }
        }
      }
   }
  
  Amenties_funtion(Amenties_id:any,pro_id: any){
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
        window.location.href=GlobalConstants.siteURL="compare"
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
