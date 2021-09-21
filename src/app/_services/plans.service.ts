import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from './../global-constants';
import { Observable, throwError } from 'rxjs';

const PLANS_API = GlobalConstants.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private http: HttpClient) { }

  getRentPlans(): Observable<any> {
    return this.http.get(PLANS_API + 'get_rent_plans', httpOptions);
  }

  getLetOutPlans(): Observable<any> {
    return this.http.get(PLANS_API + 'get_letout_plans', httpOptions);
  }

  getRentFeatures(): Observable<any> {
    return this.http.get(PLANS_API + 'get_rent_features', httpOptions);
  }

  getLetOutFeatures(): Observable<any> {
    return this.http.get(PLANS_API + 'get_letout_features', httpOptions);
  }
}
