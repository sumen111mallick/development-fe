import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
   providedIn: 'root'
})
export class PostsGuard implements CanActivate {

   constructor(private tokenStorage: TokenStorageService, private router: Router) { }

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;

      return this.checkLogin(url);

      //return true;
   }

   checkLogin(url: string): true | UrlTree {
      console.log("Url: " + url);

      //let val: string = this.tokenStorage.getUser().usertype;
      let val = this.tokenStorage.getUser();
      console.log(val);

      if (val != null && val.usertype == "11") {
         if (url == "/login")
            this.router.parseUrl('/admin-blog');
         else
            return true;
      } else {
         return this.router.parseUrl('/blog');
      }
   }

}
