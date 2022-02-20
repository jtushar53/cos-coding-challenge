import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService
{
    _accessToken: string;
    private _authenticated: boolean = false;
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private storage: Storage
    )
    {
    }

    setAccessToken(token: string): Promise<any>{
        return this.storage.set('authtoken', token);
    }

    getAccessToken(): Promise<string>{
        return this.storage.get('authtoken');
    }

    clearAccessToken(): Promise<string>{
        return this.storage.remove('authtoken');
    }


    setUserId(token: string): Promise<any>{
        return this.storage.set('userid', token);
    }

    getUserId(): Promise<string>{
        return this.storage.get('userid');
    }

    clearUserid(): Promise<string>{
        return this.storage.remove('userid');
    }

    //TODO: need create a type for credentials
    signIn(credentials: { email: string; password: string; meta: string  }): Observable<any>
    {
        debugger;
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
            })
        );
    }

    signOut(): Observable<any>
    {
        from(this.clearAccessToken()).subscribe();
        this._authenticated = false;
        return of(true);
    }
    
    async verifyAndRefreshToken(): Promise<Observable<boolean>>
    {
        if ( this._authenticated )
        {
            return of(true);
        }
        //TODO: extract jwt and verify token expiry 
    }
}