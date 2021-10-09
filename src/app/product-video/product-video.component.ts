import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from './../global-constants';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-video',
  templateUrl: './product-video.component.html',
  styleUrls: ['./product-video.component.css']
})
export class ProductVideoComponent implements OnInit {
  public ftpstring: string = GlobalConstants.ftpURL;
  public sitestring: string = GlobalConstants.siteURL;
  public showLoadingIndicator:boolean=false;
  public isLoggedIn:boolean=false;
  public productdata:any;
  public youtube_url: string;
  public safeURL:any;
  public Product_id:number=0;
  public id:number=0;
  public video_link:number=0;

  constructor(
    private _sanitizer: DomSanitizer,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route:ActivatedRoute,
    private authService: AuthService) {
      this.route.queryParams.subscribe((params) => {
        // console.log(params.id);
      this.id = params.id;
      this.Product_id=this.id;
      this.single_property_data(this.id);
      }); 
     }

  ngOnInit(): void {
  }
  single_property_data(id: any){
    this.showLoadingIndicator = true;
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true;
      //console.log(this.isLoggedIn);
      this.authService.product_login_see(id).subscribe(
        data => {
          // console.log(data);
          if(data.product.length== 0){
          this.redirect_to_home_page();
          } 
         
          this.video_link=data["product"]["0"].video_link.length;
          // console.log(this.productdata);
          this.youtube_url = "https://www.youtube-nocookie.com/embed/" + data["product"]["0"]["video_link"]+"?playlist="+data["product"]["0"]["video_link"]+"&loop=1&mute=1";          
          this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.youtube_url);
          this.showLoadingIndicator = false;
  
          
        },
          err => {
            //console.log(err);
          }
        );
    }else{
      this.authService.product_see(id).subscribe(
      data => {
        // console.log(data);
        if(data.product.length== 0){
          this.redirect_to_home_page();
         } 
        this.video_link=data["product"]["0"].video_link.length;
        // console.log(this.productdata);
        this.youtube_url = "https://www.youtube-nocookie.com/embed/" + data["product"]["0"]["video_link"]+"?playlist="+data["product"]["0"]["video_link"]+"&loop=1&mute=1";            
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.youtube_url);
        this.showLoadingIndicator = false;
      },
        err => {
          //console.log(err);
          this.showLoadingIndicator = false;
        }
      );
    }
  }
  
  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
  }
  redirect_to_home_page(): void {
    window.location.href=GlobalConstants.siteURL
  }

}
