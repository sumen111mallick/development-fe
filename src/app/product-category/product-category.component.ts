import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { GlobalConstants } from './../global-constants';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  
  public property_type_count:any;
  public property_type_count_length:number=0;
  public property_type_result:any;
  public property_type:any;
  public ftpstring: string = GlobalConstants.ftpURL;
  public sitestring: string = GlobalConstants.siteURL;
  content:any;
  public data_session:any;

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private tokenService: TokenStorageService
    ) { }

  ngOnInit(): void {
    this.Property_type_data();
  }
  
Property_type_data(): void{
  this.userService.get_property_type().pipe().subscribe(
    (data: any) => {
      //  console.log(amenitiesdata);
      this.property_type = data.count;
      this.property_type_count=data.count;
      this.property_type_count_length=data.count.length;
      //console.log(this.property_type_count);
      this.property_type_result = this.property_type;
      //console.log(this.property_type_result);
      //console.log(this.content);
    },
    err => {
      this.content = JSON.parse(err.error).message;
    }
  );
 }
 
Property_type_search(id: number,pro_type: string):void{
  //console.log(id);
  if(this.tokenStorage.getToken()){
    //console.log('logging');
    this.authService.search_pro_type_login(id).subscribe(
        
      data => {
        this.tokenService.searchData(data);
          //console.log(this.tokenService.returnSearch());
          this.data_session=[id,pro_type];
          this.tokenService.search_pro_type(this.data_session);
          window.location.href=GlobalConstants.siteURL+"productlisting";
      },
      err => {
        //console.log(err.error);
      }
    );
  }
  else{
    this.authService.search_pro_type(id).subscribe(
      data => {
        this.tokenService.searchData(data);
        //console.log(this.tokenService.returnSearch());
        this.data_session=[id,pro_type];
        this.tokenService.search_pro_type(this.data_session);
        window.location.href=GlobalConstants.siteURL+"productlisting";
      },
      err => {
        //console.log(err.error);
      }
    );
  }
}


}
