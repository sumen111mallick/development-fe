import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from './../_services/token-storage.service';
import { GlobalConstants } from './../global-constants';
import { ProductService } from './../_services/product.service';
import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit {
  [x: string]: any;

  prod_id: any ;
  user_data: [];
  login_userID:string[] = null;
  login_usertype:string[] = null;
  product_data: [];
  ftpstring: string = GlobalConstants.ftpURL;
  sitestring: string = GlobalConstants.siteURL;
  p_img1= null;
  p_img2= null;
  p_img3= null;
  p_img4= null;
  p_img5= null;
  form: any = {};
  Review;
  map_url;
  cityValue;
  content: any = {};
  isLoggedIn;
  first_prod = null;
  second_prod = null;
  third_prod = null;
  showLoadingIndicator = true;
  product_amenties_length=null;
  product_amenties:any={};

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private idService: TokenStorageService,
    private prodservice: ProductService,
    private router: Router,
    private route:ActivatedRoute,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
  ) { 
        this.route.params.subscribe((params) => {
        this.id = params["id"];
        this.showLoadingIndicator = true;
        this.single_property_data(this.id);
     }); }

  ngOnInit(): void {
    // console.log(this.id,"Proudct Id");
    // this.prodservice.setData(1);
    // this.prod_id = this.prodservice.getData();
    this.titleService.setTitle('Property Page');
    this.prod_id = this.idService.getProdId();
   
    if (this.tokenStorage.getToken() != null){
      this.isLoggedIn = true;
      this.login_userID = this.idService.getUser().id;
      this.login_usertype = this.idService.getUser().usertype;

    }
  
    // this.login_userID=this.login_user.id;
    // this.login_usertype=this.login_user.usertype;
    //console.log(this.router.url);
    // {this.route.queryParams.subscribe(params => {
    //     let id = params['id'];
    //     console.log(id);
    //     if(id != null){
    //       this.prod_id = id;
    //     }
    //   })
    // }
   

    if( this.idService.getUser() != null)
    {
      this.authService.saveSearch(this.idService.getUser().id, this.prod_id).subscribe(
        data => {
          console.log(data)
        },
        err => {
          console.log(err)
        }
      )
    }

    this.get_review();
    this.amenities();
    this.feature_property();
    this.idService.saveCdata(null);
    this.idService.saveProdId(null);
    if (this.tokenStorage.getToken() != null){
      this.isLoggedIn = true;
      this.loginuser_countProduct(this.id);
      this.loginuser_coutData();
    }
  }
  single_property_data(id){
    console.log(id);
    this.showLoadingIndicator = true;
    this.authService.product_see(id).subscribe(
    data => {
      console.log(data);
      this.user_data = data["user_data"];
      this.product_data = data["product"];
      this.p_img1 =  data["product"]["0"]["product_image1"];
      this.p_img2 = data["product"]["0"]["product_image2"];
      this.p_img3 =  data["product"]["0"]["product_image3"];
      this.p_img4 =  data["product"]["0"]["product_image4"];
      this.p_img5 =  data["product"]["0"]["product_image5"];
      this.map_url = "https://maps.google.com/?q=" + data["product"]["0"]["map_latitude"] + "," + data["product"]["0"]["map_longitude"];
      console.log(this.map_url)
      this.product_amenties= data["product"]["0"].amenities;
      this.product_amenties_length= data["product"]["0"].amenities.length;
      console.log(this.product_amenties_length);
      console.log(this.product_amenties);
      console.log(this.user_data);
      this.cityValue=data["product"]["0"]["city"];
      this.similarproperty(this.cityValue);
      this.showLoadingIndicator = false;

    },
      err => {
        console.log(err);
      }
    );
  }
  
  // recently_view():void{
  //   this.userService.getRecently_viewProperty().subscribe(
  //     viewproperty => { 
  //       this.view_property = viewproperty.data;
  //       console.log("recently_view");
  //       console.log(this.view_property);  
  //       console.log(this.login_userID);
  //       console.log(this.login_usertype);        
  //     },
  //     err => {
  //       this.content = JSON.parse(err.error).message;
  //     }
  //   );
  // }
  
  // amenities(): void{
  //   this.userService.getamenitiesdata().pipe().subscribe(
  //     (amenitiesdata: any) => {
  //       //  console.log(amenitiesdata);
  //       this.amenities = amenitiesdata.data;
  //       console.log(this.amenities);
  //       //console.log(this.content);
  //     },
  //     err => {
  //       this.content = JSON.parse(err.error).message;
  //     }
  //   );
  // }

   amenities(): void{
     this.userService.getamenitiesdata().pipe().subscribe(
       (amenitiesdata: any) => {
         //  console.log(amenitiesdata);
         this.amenities = amenitiesdata.data;
         this.amenitiesresult = this.amenities;
         this.Amenties_length=this.amenitiesresult.length;
         //console.log(this.content);
       },
       err => {
         this.content = JSON.parse(err.error).message;
       }
     );
   }
  loginuser_coutData(){
    this.authService.get_CountData().subscribe(
      data => {
        console.log(data.data);
        this.Recently_UserData = data.data;
        console.log("Recently Views Properties");
         console.log(this.Recently_UserData);
      });
  
  }
  loginuser_countProduct(id){
    console.log(this.id);
     this.authService.User_productCount(this.id).subscribe(
       data => {
         console.log(data);
       });
   
   }

  prod_function(data: any){
    // Login check
    if(this.tokenStorage.getUser() != null){
      // this.isLoggedIn = true
      // console.log(this.isLoggedIn);
    }
    else{
      this.redirect_to_home();
    }
        if (this.tokenStorage.getToken()){
      // this.isLoggedIn = true;      
      this.authService.Wishlist(data).pipe().subscribe(
        (result: any) =>{
          console.log(result);
          this.similarproperty(this.cityValue);
        },
        err => {
          console.log(err.error);
        }
      );

    }
    else{
      this.isLoggedIn = false ;
    }
  }
  DeleteProd_function(data: any){
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true;
       this.authService.WishlistRemove(data).pipe().subscribe(
        (result: any) =>{
          console.log(result);
          this.similarproperty(this.cityValue);
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

  Amenties_funtion(Amenties_id:any){
    // var len= this.product_amenties.length; 
    // console.log(Amenties_id);
    // console.log(this.product_amenties);
  if(this.product_amenties_length !=null){
    for (let i = 0; i < this.product_amenties_length; i++) {
      if(Amenties_id==this.product_amenties[i].amenties){
        return  true;
      }
    }
  }
  return false;
}


  similarproperty(cityValue){
    if(this.tokenStorage.getToken()){
    this.authService.login_similarproperty(this.cityValue).subscribe(
      data => {
        this.content = data["product"];
        console.log(this.content);
        this.sendinformation();
      },
        err => {
          console.log(err);
        }
      );
    }else{
      this.authService.product_similarproperty(this.cityValue).subscribe(
      data => {
        this.content = data["product"];
        console.log(this.content);
      },
        err => {
          console.log(err);
        }
      );

    }
  }

  onSubmit(): void {
    console.log(this.form)
    this.authService.create_review(this.form, this.id).subscribe(
      data => {
        console.log(data)
        window.location.reload();
      },
      err => {
        console.log(err.error);
      }
    );
}

  get_review(): void {
    console.log(this.form)
    this.authService.product_review(this.prod_id).subscribe(
      data => {
        console.log('sfesf')
        console.log(data)
        this.Review = data.data
      },
      err => {
        console.log(err.error);
      }
    );
}

feature_property():void{
  this.userService.getRecently_viewProperty().subscribe(
    featureproperty => { 
      this.feature_property = featureproperty.data;
      console.log("feature_properties");
      console.log(this.feature_property);        
    },
    err => {
      this.content = JSON.parse(err.error).message;
    }
  );
}

  onShare(){
    alert("Your Shareable Link is \n" + this.sitestring + this.router.url + "?id=" + this.prod_id);
  }
  onComp(data){


    // Old code

    // console.log(this.idservice.getCdata());
    // console.log(this.idservice.getProdId());


    // if(this.idservice.getCdata() != null){
    //   this.idservice.saveProdId(data);
    //   console.log(this.idservice.getCdata());
    //   console.log(this.idservice.getProdId());
    //   console.log("1rd");
    // }

    // if(this.idservice.getCdata()){

    //   this.prod_if = this.idservice.getCdata;
    //   this.idservice.saveProdId(this.prod_if);
    //   this.idservice.saveCdata(data);
    //   console.log(this.idservice.getCdata());
    //   console.log(this.idservice.getProdId());
    //   console.log("3rd");
    // }


    if(this.first_prod == null){
      this.first_prod = data
    }
    else if(this.first_prod != null){
      if (this.second_prod != null){
        this.third_prod = this.second_prod
        this.second_prod = this.first_prod
        this.first_prod = data
      }
      else{
      this.second_prod = data
      }
    }

    console.log(this.first_prod+"|"+this.second_prod+"|"+this.third_prod)

    if (this.first_prod != null && this.second_prod != null && this.third_prod != null){

      // alert("Added two property to compare list. (Only two properties can be compared at a time)")

      this.idService.saveProdId(this.first_prod);
      this.idService.saveCdata(this.second_prod)
      this.idService.saveProd2Id(this.third_prod);
      window.location.href=GlobalConstants.siteURL+"compare"
    }

    console.log(this.idService.getProdId());
    console.log(this.idService.getProd2Id());
    console.log(this.idService.getCdata());
  }

  
  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
  }
   // topbar searching functionalty
    sendinformation(){
      this.userService.emit<string>('true');
   } 

}
