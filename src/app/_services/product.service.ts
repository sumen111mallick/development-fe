import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

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

}
