import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
@Injectable({
  providedIn: 'root'
})
export class UserLogsService {

  ip_address:any;
  url:any; 

  constructor(
    private deviceDetectorService: DeviceDetectorService,
    ) {
      this.loadScript('../assets/js/clientInfo.js'); 
      this.url = window.location.href;
     }
    public getDeviceInfo(): any {
      return this.deviceDetectorService.deviceType;
    }
    public getbrowserInfo(): any {
      return this.deviceDetectorService.browser;
    }
    public getIpAddress(): any {
      this.ip_address=localStorage.getItem('ipAddress');
      return this.ip_address;
    }
    
    public geturl(): any {
      return this.url;
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
}
