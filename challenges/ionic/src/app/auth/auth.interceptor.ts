import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, merge, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AUTH_TOKEN_INTERCEPTOR_FILTER } from './auth.module';



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
        return merge(from(this._authService.getAccessToken()), from(this._authService.getUserId()))
        .pipe(
            switchMap(tokenWithUserid => {
                debugger;
                console.log(tokenWithUserid);
               const headers = newReq.headers
                        .set('authtoken', tokenWithUserid)
                        .append('Content-Type', 'application/json');
               const requestClone = newReq.clone({
                 headers 
                });
              return next.handle(newReq).pipe(
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