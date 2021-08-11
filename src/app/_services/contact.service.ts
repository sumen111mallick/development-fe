import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from './../global-constants';
import { Observable, throwError } from 'rxjs';

const BLOG_API = GlobalConstants.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  saveContact(postdata): Observable<any> {
    console.log(postdata);
    return this.http.post(BLOG_API + 'contact-form', postdata);
  }
}
