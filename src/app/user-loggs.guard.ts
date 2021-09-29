import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';
import { Location } from '@angular/common';
import { AuthService } from './_services/auth.service';
import { UserLogsService } from './_services/user-logs.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { GlobalConstants } from './global-constants';

const AUTH_API = GlobalConstants.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserLoggsGuard implements CanActivate {
  
  public userEmail: string[] = null;
  private usertype: any;
  public userDetails: any;
  ip_address:any; 
  ipAddress:string;
  systemInfo: DeviceInfo;
  pro_id:any=null;
  type:any;
  device_info:any;
  browser_info:any;
  url_info:string;
  url: any;
  input_info:any=null;
  user_cart:any=null;
  
  constructor( 
    private tokenStorage: TokenStorageService,
    private userlogs: UserLogsService,
    private router: Router,
    private authService: AuthService,
    private Location:Location,
    private http: HttpClient,
    private deviceDetectorService: DeviceDetectorService,
    private httpClient: HttpClient ) 
    {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       
       if(route.queryParams.id != null){
        this.pro_id=route.queryParams.id;
       }
        // console.log(this.pro_id);
       this.type = route.data.type;  
      //  this.loadScript('./assets/js/clientInfo.js');     
       return this.checkLogin();
  }
  loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  checkLogin() {
    if(this.tokenStorage.getToken() != null) {
      this.userEmail    = this.tokenStorage.getUser().misc.email;
      this.usertype     = this.tokenStorage.getUser().usertype;
      this.url_info  = this.userlogs.geturl();      
      this.device_info  = this.userlogs.getDeviceInfo();
      this.browser_info = this.userlogs.getbrowserInfo();
      this.ip_address   = this.userlogs.getIpAddress();
      this.authService.user_logs(this.ip_address,this.device_info,this.browser_info,this.url_info,this.pro_id,this.type,this.userEmail,this.input_info,this.user_cart).subscribe(
        data => {
          // console.log(data.status);
        });
        return true;
    }
    else {
      return true;
    }
  }
 
}
