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
  public draft_pro_data:any=[];
  public solid_pro_data:any=[];
  public purchased_pro_data:any=[];  
  ftpstring: string = GlobalConstants.ftpURL;
  usertype:any;
  page: number = 1;
 public p: number;
  public contentLenght:number=0;
  public draft_Lenght:number=0;
  public solid_Lenght:number=0;
  public purchased_Lenght:number=0;
  e: any;

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
    this.Myproperty();
    this.Draft_property();
    this.property_solid();
    this.property_pursched();
   

  }
  Myproperty(){
    this.showLoadingIndicator = true;
    this.userService.getproperties().pipe().subscribe(
      (data: any) => {
        this.contentLenght=data.data.length;
        //console.log(this.contentLenght);
        this.content = data.data;
        this.showLoadingIndicator = false;
        // console.log(data.data);

      },
      err => {
        //console.log(err)
      }
    )
  }
  
  property_solid(){
    this.showLoadingIndicator = true;
    this.userService.getproperties_solid().pipe().subscribe(
      (data: any) => {
        this.solid_Lenght=data.data.length;
        this.solid_pro_data= data.data;
        this.showLoadingIndicator = false;

      },
      err => {
        //console.log(err)
      }
    )
  }
  
  property_pursched(){
    this.showLoadingIndicator = true;
    this.userService.getproperties_pursched().pipe().subscribe(
      (data: any) => {
        
        this.purchased_Lenght=data.data.length;
        this.purchased_pro_data= data.data;
        this.showLoadingIndicator = false;

      },
      err => {
        //console.log(err)
      }
    )
  }
  
  Draft_property(){
    this.showLoadingIndicator = true;
    this.userService.Draft_properties().pipe().subscribe(
      (data: any) => {
        this.draft_Lenght=data.data.length;
        // console.log(this.draft_Lenght);
        this.draft_pro_data= data.data;
        this.showLoadingIndicator = false;
        //console.log(data.data);

      },
      err => {
        //console.log(err)
      }
    )
  }
  del_func(id){
    this.showLoadingIndicator = true;
    this.authService.property_delete(id).subscribe(
        data => {
          //console.log(data);
          this.Myproperty();
        },
        err => {
          //console.log(err)
        }
      );
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
    //console.log(id);
    this.router.navigate(["UdateProperty/", id]);
  }
  price_comma(value:number):void{
    this.e=value;
    var t = (this.e = this.e ? this.e.toString() : "").substring(this.e.length - 3)
    , n = this.e.substring(0, this.e.length - 3);
  return "" !== n && (t = "," + t),
    n.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + t
  }
}
