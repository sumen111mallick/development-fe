import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Router } from '@angular/router';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { HostListener } from "@angular/core";
import { UserLogsService } from './../_services/user-logs.service';
import { Title } from '@angular/platform-browser';

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
  property_comp:any;
  content:any={};
  public showLoadingIndicator: boolean =false;
  public amenitiesresult:any;
  e: any={};
  public devicetype:number;
  public  amenties_uncheck: any = [];
  product_amenties:any=[];
  public unique_ameties:any=[];
  filter_amenties:any=[];
  property_data: any = [];
  pro_id:any=null;
  type:any;
  device_info:any;
  browser_info:any;
  url_info:string;
  url: any;
  input_info:any=null;
  ip_address:any; 
  ipAddress:string;		
  userEmail:any;
  user_cart:any;


  constructor(
    private router: Router,
    private idService: TokenStorageService,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private titleService: Title,
    private tokenStorage: TokenStorageService,
    private userlogs: UserLogsService
  ) { 
      this.getScreenSize();
      if (this.tokenStorage.getToken() == null){
        this.redirect_to_login();    
      }
    }


  ngOnInit(): void {
    this.titleService.setTitle('Compare Property');
    this.pro_comp();
    this.url_info     = this.userlogs.geturl();      
    this.device_info  = this.userlogs.getDeviceInfo();
    this.browser_info = this.userlogs.getbrowserInfo();
    this.ip_address   = this.userlogs.getIpAddress();
    
    this.property_data = new Array<string>();

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
        this.product_amenities();
        this.pro_comp_refresh();
        
        // user logs funtionalty
        if(this.property_comp_length>0){
          // loop start
          for(let i=0; i<this.property_comp_length; i++){
            if(this.property_comp[i].productdetails != null){
              // inner condition  check 
              if(this.property_comp[i].productdetails.expected_pricing != null){
                this.property_name=this.property_comp[i].productdetails.build_name;
                this.property_price=this.property_comp[i].productdetails.expected_pricing;
                this.property_type="property_sales";
                this.property_uid=this.property_comp[i].productdetails.product_uid;
                this.property_data.push({'name':this.property_name,'property_id':this.property_uid,'type':this.property_type,'price':this.property_price});
                }
                if(this.property_comp[i].productdetails.expected_rent != null){
                  this.property_name=this.property_comp[i].productdetails.build_name;
                  this.property_price=this.property_comp[i].productdetails.expected_rent;
                  this.property_type="property_rent";
                  this.property_uid=this.property_comp[i].productdetails.product_uid;
                  this.property_data.push({'name':this.property_name,'property_id':this.property_uid,'type':this.property_type,'price':this.property_price});
               }
            }
           
          } 
          //  loop closed 
            this.userEmail = this.tokenStorage.getUser().email;
            this.type      = "compare_page";
            this.user_cart = this.property_data;
            this.authService.user_logs(this.ip_address,this.device_info,this.browser_info,this.url_info,this.pro_id,this.type,this.userEmail,this.input_info,this.user_cart).subscribe(
              data => {
                this.showLoadingIndicator = false;
              });
          }
        // user logs funtionalty

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
        this.showLoadingIndicator = false;
      }
    );
  }
  product_amenities(): void{
    this.showLoadingIndicator = true;
    this.userService.getamenitiesdata().pipe().subscribe(
      (amenitiesdata: any) => {
        this.amenities = amenitiesdata.data;
        // console.log(this.amenities.length);
        for(let i=0; i<this.amenities.length;i++){
          if (this.filter_amenties_fun(this.amenities[i].id)) {
            this.filter_amenties.push(this.amenities[i]);
          }
        }
        this.amenitiesresult = this.filter_amenties;
        // console.log(this.amenitiesresult);
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.showLoadingIndicator = false;
      }
    );
  }
  filter_amenties_fun(amenties_id:any){
    if(this.unique_ameties.length !=null){
      for (let i=0; i<this.unique_ameties.length; i++) {
        if(this.unique_ameties[i]==amenties_id){
          // console.log(amenties_id);
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
        this.toastr.error('Remove Compare Property','Property', {
          timeOut: 4000,
        });
        this.pro_comp();
        // this.showLoadingIndicator = false;
        this.showLoadingIndicator = false;
        //window.location.href=GlobalConstants.siteURL="compare"
        },
        err => {
          //console.log(err)
          this.showLoadingIndicator = false;
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
