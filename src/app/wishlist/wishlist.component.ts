import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


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
  
  showLoadingIndicator = false;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private idservice: TokenStorageService,
    private userService: UserService
    ) { }

  
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
          this.sendinformation();
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }
    DeleteProd_function(data: any){
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

   redirect_to_home(): void {
      window.location.href=GlobalConstants.siteURL="login"
    }
    prod_func(data){
      console.log(this.idservice.saveProdId(data));
      // this.myservice.setData(data);
      // this.router.navigate(["/productpage"])
    }
    
  sendinformation(){
    this.userService.emit<string>('true');
 } 

}
