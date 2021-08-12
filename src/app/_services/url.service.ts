import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

   private previousUrl: string;
   private currentUrl: string;
 
   constructor(private router : Router) {
     this.currentUrl = this.router.url;
     router.events.subscribe(event => {
       if (event instanceof NavigationEnd) {        
         this.previousUrl = this.currentUrl;
         this.currentUrl = event.url;
       };
     });
   }
 
   public getPreviousUrl(){
     return this.previousUrl;
   }    

  /*private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public previousUrl$: Observable<string> = this.previousUrl.asObservable();

  setPreviousUrl(previousUrl: string) {
    this.previousUrl.next(previousUrl);
}*/

}
