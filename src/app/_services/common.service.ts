import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private login_check = new Subject<any>();

  sendUpdate(message: boolean) {
    this.login_check.next({ text:message });
  }

  getUpdate(): Observable<any> {
    return this.login_check.asObservable();
  }

  constructor() { }
}
