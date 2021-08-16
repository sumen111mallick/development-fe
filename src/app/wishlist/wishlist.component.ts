import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  [x: string]: any;
  wishlist_length=0;
  
  form: any = {};
  ared: any = {};
  isLoggedIn = false;
  isFormSubmitted = false;
  errorMessage = '';
  roles: string[] = [];
  content: any = {};
  maintenance: boolean = true;
  parking: boolean = false;
  ftpstring = GlobalConstants.ftpURL;
  e: any={};  
  showLoadingIndicator = false;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private idservice: TokenStorageService,
    private userService: UserService,
    private toastr: ToastrService
    ) {
        if (this.tokenStorage.getToken() == null){
      
          this.redirect_to_home();    
        }
     }

  
    ngOnInit(): void {
      this.titleService.setTitle('Create Listing');
      // Login check
      if(this.tokenStorage.getUser() != null){
        this.isLoggedIn = true
        console.log(this.isLoggedIn)
      }
      else{
        this.redirect_to_home();
      }
      this.content = this.tokenStorage.getUser().id;
      this.maintenance = true;
      this.parking = false;
      if (this.tokenStorage.getToken()){
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().username;
        this.getwishlist();
      }
      else{
        this.isLoggedIn = false ;
        this.redirect_to_home();
      }
    }
      
// product comaprision functinalty 

  
// product comaprision functinalty 
product_comp(id:number){
  console.log(id);
  // Login check
  if(this.tokenStorage.getUser() != null){
    this.isLoggedIn = true;
    console.log(this.isLoggedIn);
    this.maintenance = true;
    this.parking = false;     
      this.authService.Crete_product_comp(id).pipe().subscribe(
        (data: any) =>{
          console.log(data);
          this.getwishlist();
          if(data.data.length>4){
            this.toastr.info('Bucket are the Full...!!!', 'Property', {
              timeOut: 3000,
            });
          }else{
            this.toastr.success('Succesfully Added in Bucket...', 'Property', {
              timeOut: 3000,
            });
          }
        },
        err => {
          console.log(err.error);
        }
      );
  }
  else{
    this.redirect_to_home();
  }
}
  getwishlist(): void{
    this.showLoadingIndicator = true;
    this.userService.getwishlistdata().pipe().subscribe(
      (wishlistdata: any) => {
        this.wishlistcontent = wishlistdata.data;
        this.wishlistresult = this.wishlistcontent;
        this.wishlist_length =this.wishlistcontent.length;
        console.log(this.wishlistresult);
        this.showLoadingIndicator = false;
        this.wishlist_info();
        this.pro_comp_refresh();
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  wishlist_remove(data: any){
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true
        this.authService.WishlistRemove(data).pipe().subscribe(
        (result: any) =>{
          console.log(result);
          this.getwishlist();
        },
        err => {
          console.log(err.error);
        }
      );
    }
    else{
      this.redirect_to_home();
    }
    
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

   redirect_to_home(): void {
      window.location.href=GlobalConstants.siteURL="login"
    }
    prod_func(data){
      console.log(this.idservice.saveProdId(data));
      // this.myservice.setData(data);
      // this.router.navigate(["/productpage"])
    }
    // Property wishlist refresh 
    wishlist_info(){
    this.userService.emit<string>('true');
 } 

 

  // topbar proeprty comparion functionalty
  pro_comp_refresh(){
    this.userService.pro_comp_emit<string>('true');
  } 

  // property comparision redirect comapre page 
  redirect_to_compare(): void {
    window.location.href=GlobalConstants.siteURL="compare"
  }

}
