import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { switchMap, tap, switchMapTo, catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService
{
    _accessToken: string;
    _userid: string;
    private _authenticated: boolean = false;
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private storage: Storage
    )
    {
    }
    //TODO need to merge access token and user id, as both are used in interceptor
    setAccessToken(token: string): Promise<any>{
        this._accessToken = token;
        return this.storage.set('authtoken', token);
    }

    getAccessToken(): Promise<string>{
        if(this._accessToken) Promise.resolve(this._accessToken);
        return this.storage.get('authtoken');
    }

    clearAccessToken(): Promise<string>{
        this._accessToken = null;
        return this.storage.remove('authtoken');
    }


    setUserId(userid: string): Promise<any>{
        this._userid = userid;
        return this.storage.set('userid', userid);
    }

    getUserId(): Promise<string>{
        if(this._userid) Promise.resolve(this._userid);
        return this.storage.get('userid');
    }

    clearUserid(): Promise<string>{
        this._userid = null;
        return this.storage.remove('userid');
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
                next: (response: any) => from( this.setAccessToken(response.token)),
                error: err => throwError('unauthorised user')
            }),
            tap({
                next: (response: any) => from( this.setUserId(response.userId)),
                error: err => throwError('unauthorised user')
            }),
            switchMap((response: any) => {
                this._authenticated = true;
                delete response.token;
                this._userService.user = response;
                return of(response);
            }),
            catchError((error) => { 
                this._authenticated = false;
                return throwError('unauthorised user')
            })
        );
    }

    signOut(): Observable<any>
    {
        this._authenticated = false;
        return from(this.clearAccessToken()).pipe(
            switchMapTo(of(true))
        );
    }
    
    async verifyAndRefreshToken(): Promise<Observable<boolean>>
    {
        if ( this._authenticated )
        {
            return of(true);
        }
        //TODO: extract jwt and verify token expiry, if expired refresh token
    }

    check(): Observable<boolean>
    {
        if(this._accessToken && this._userid) {
            this._authenticated = true;
            return of(this._authenticated);
        }
        return forkJoin([
            from(this.getAccessToken()),
            from(this.getUserId())
        ]).pipe(switchMap(tokenanduserid => {
            (tokenanduserid[0] && tokenanduserid[1]) ? this._authenticated = true : this._authenticated = false;
            return of(this._authenticated);
        }))
        //TODO: extract jwt and verify token expiry 
        
    }
}