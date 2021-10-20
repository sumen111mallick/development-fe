import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { GlobalConstants } from './../global-constants';
import { HttpHeaders } from '@angular/common/http';

const AUTH_API = GlobalConstants.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable()
export class ProductService {
  public sharedData:string;


  constructor(private http : HttpClient){}

  postFile(username: string, email: string, password: string, cpassword: string, profile_pic: File){
    const endpoint = "http://127.0.0.1:8000/api/auth/signup/";
    const formData: FormData = new FormData();
    formData.append('profile_pic', profile_pic, profile_pic.name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('cpassword', cpassword);
    return this.http.post(endpoint, formData);
  }

  get_product_details(product_id) {
    return this.http.post(AUTH_API + 'get_product_details', JSON.stringify({
      id: product_id
    }), httpOptions);
  } 

}
