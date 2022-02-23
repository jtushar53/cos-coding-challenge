import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { forkJoin, from, merge, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AUTH_TOKEN_INTERCEPTOR_FILTER } from './auth.module';
import { JwtUtil } from './jwt.util';



@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor
{
    constructor(
        private _authService: AuthService,
        @Inject('BASE_API_URL') private baseUrl: string,
        @Inject(AUTH_TOKEN_INTERCEPTOR_FILTER) private filter)
    {}

    intercept(req: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<any>>
    {
        let newReq = req.clone({ url: `${this.baseUrl}/${req.url}` });
        if (!this.filter(newReq)) {
        return this._authService.getUserInfo().pipe(
            switchMap((userInfo => {
                    (!userInfo.token || !userInfo.userid) && throwError('unauthorised');
                    if(JwtUtil.isTokenExpired(userInfo.token, 3600)) {
                        return this._authService.verifyAndRefreshToken();
                    }
                    return of(userInfo);
                })
            ),
            switchMap(userInfo => {
               const headers = new HttpHeaders()
                        .set('authtoken', userInfo.token)
                        .set('userid', userInfo.userId);
               const requestClone = newReq.clone({
                 headers 
                });
              return next.handle(requestClone).pipe(
                catchError((error) => {    
                    if ( error instanceof HttpErrorResponse && error.status === 401 )
                    {
                        this._authService.signOut();
                        location.reload();
                    }
                    return throwError(error);
                })
            );
            })
           );
        } else {
            return next.handle(newReq);
        }
    }
}