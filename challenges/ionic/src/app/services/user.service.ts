import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //TODO: Create a type for user
  _user: ReplaySubject<any> = new ReplaySubject<any>(1);
  set user(value: any)
  {
    debugger;
      this._user.next(value);
  }

  get user$(): Observable<any>
  {
      return this._user.asObservable();
  }
  constructor() { }

  
}
