import { GlobalConstants } from './../global-constants';
import {BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from  'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
   // google map integrtated
   getLocationService():Promise<any>{
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(resp=>{
        resolve({lng:resp.coords.longitude, lat: resp.coords.latitude,accuracy: resp.coords.accuracy})
       
       })
     })
   }
  
  handleproductEditdata = new BehaviorSubject<any>(null);

// topbar wishlist refresh functionalty start
public _subject = new BehaviorSubject<any>('');
emit<T>(data: T){
  this._subject.next(data);
}

on<T>(): Observable<T>{
   return this._subject.asObservable();
}
// topbar wishlist refresh functionalty end

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'all', { responseType: 'json' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'auth/user', { responseType: 'json' });
  }

  getUserDetails(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'auth/verify_user', { responseType: 'json' });
  }
  getUserPhoneDetails(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'auth/verify_user_mobile');
  }										  
  googleLogin(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'auth/redirect', { responseType: 'json' });
  }

  googleCallback(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'auth/callback', { responseType: 'json' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'auth/mod', { responseType: 'json' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'auth/admin', { responseType: 'json' });
  }

  getLogout(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'auth/logout', { responseType: 'json' });
  }

  getproductlisting(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/get_product', { responseType: 'json' });
  }

  getadminevents(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'admin/event_index', { responseType: 'json' });
  }

  getproductlistingfeatured(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/get_product_featured', { responseType: 'json' });
  }
  getRecently_viewProperty(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/getRecently_viewProperty', { responseType: 'json' });
  }

  getrequirements(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/get_requ', { responseType: 'json' });
  }

  getdashboard(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/views', { responseType: 'json' });
  }

  getproperties(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/agent_properties', { responseType: 'json' });
  }

  getSearch(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/get_search', { responseType: 'json' });
  }

  getLawyerServices(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/lawyer_service', { responseType: 'json' });
  }

  getLawyerServiceIndex(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/lawyer_service_index', { responseType: 'json' });
  }

  getLoans(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'admin/loan_index', { responseType: 'json' });
  }

  // ADMIN PANEL GET REQUESTS

  getAdmin_users(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'admin/user_index', { responseType: 'json' });
  }

  getAdmin_product(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'admin/product_index', { responseType: 'json' });
  }

  getAdmin_productviews(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'admin/product_views', { responseType: 'json' });
  }

  getAdmin_reviewcount(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'admin/review_count', { responseType: 'json' });
  }

  get_review(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/review_index', { responseType: 'json' });
  }

  admin_get_review(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'admin/admin_review_index', { responseType: 'json' });
  }

  adminGetLawyerServices(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'admin/admin_lawyer_service', { responseType: 'json' });
  }

  adminGetAdminReview(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/get_requ', { responseType: 'json' });
  }
  // iqbal function start
  gettestimonialdata(): Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/testimonial', { responseType: 'json' });
  }
  getamenitiesdata():Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'amenities', { responseType: 'json' });
  }

  // wishlist data fetch
  getwishlistdata():Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/wishlist', { responseType: 'json' });
  }
  wishlistcount():Observable<any> {
    return this.http.get(GlobalConstants.apiURL + 'product/wishlist', { responseType: 'json' });
  }


}
