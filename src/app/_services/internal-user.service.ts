import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from './../global-constants';
import { HttpHeaders} from '@angular/common/http';

const AUTH_API = GlobalConstants.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class InternalUserService {

  constructor(private http: HttpClient) { }

  get_access_rights(credentials): Observable<any> {
    console.log(credentials);
    return this.http.post(AUTH_API + 'auth/get_access_rights', JSON.stringify({
      email: credentials
    }), httpOptions);
  }

  get_role_details(): Observable<any> {
    return this.http.get(AUTH_API + 'auth/get_roles', httpOptions);
  }

  get_role($id): Observable<any> {
    return this.http.get(AUTH_API + 'auth/role/' + $id, { responseType: "text" });
  }

  deleteRole($id) {
    return this.http.delete(AUTH_API + 'auth/roles/delete/' + $id);
  }

  get_areas(): Observable<any> {
    return this.http.get(AUTH_API + 'auth/get_areas', httpOptions);
  }
}
