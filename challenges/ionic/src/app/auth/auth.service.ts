import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { switchMap, tap, switchMapTo, catchError, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
    _userInfo: string;
    private _authenticated: boolean = false;
    constructor(
        private _httpClient: HttpClient,
        private storage: Storage
    )
    {
    }
    //TODO need to add type to user, below methods can be converted into a operator for better usability
    setUserInfo(userInfo: string): Observable<any>{
        this._userInfo = userInfo;
        return from(this.storage.set('userInfo', userInfo)).pipe(switchMap(() => of(userInfo)));
    }

    getUserInfo(): Observable<any>{
        if(this._userInfo) return from(Promise.resolve(this._userInfo));
        return from(this.storage.get('userInfo')); 
    }

    clearUserInfo(): Observable<any>{
        this._userInfo = null;
        return from(this.storage.remove('userInfo'));
    }


    //TODO: need create a type for credentials
    signIn(credentials: { email: string; password: string; meta: string  }): Observable<any>
    {
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }
        return this._httpClient.put(`authentication/${credentials.email}`, credentials).pipe(
            tap({
                next: (response: any) => from( this.setUserInfo(response))
            }),
            switchMap((response: any) => {
                this._authenticated = true;
                return of(response);
            }),
            catchError((error) => { 
                this._authenticated = false;
                return throwError(error.error)
            })
        );
    }

    signOut(): Observable<any>
    {
        this._authenticated = false;
        return this.clearUserInfo().pipe(
            switchMapTo(of(true))
        );
    }
    
    verifyAndRefreshToken(): Observable<string[]>
    {
        return this.getUserInfo().pipe(
            switchMap((userInfo) => {
                return this._httpClient.post(`authentication/${userInfo.userId}`, {...userInfo} ).pipe(
                    switchMap((response: any) => this.setUserInfo(response)),
                    switchMap((updatedUserInfo: any) => {
                        return of(userInfo);
                    })
                );
            })
        ) 
        //TODO: extract jwt and verify token expiry, if expired refresh token
    }

    check(): Observable<boolean>
    {
        if(this._userInfo) {
            this._authenticated = true;
            return of(this._authenticated);
        }
        return this.getUserInfo().pipe(switchMap((userInfo: any) => {
            (userInfo?.token && userInfo?.userId) ? this._authenticated = true : this._authenticated = false;
            return of(this._authenticated);
        }))        
    }

    emailRegistered(email){
        return this._httpClient.get(`authentication/${email}/registered`)
        .pipe(
            map(res => {
              if (res) return of(null);
            }),
            catchError((error) => { 
                if(error.status === 404) return of({ registered: false })
                return of(null);//TODO: can add one more field to identify if server is not available
            })
        );
    }
}