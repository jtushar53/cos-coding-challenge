import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { forkJoin, from, merge, Observable, throwError } from 'rxjs';
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
        return forkJoin([
            from(this._authService.getAccessToken()), from(this._authService.getUserId())
        ]).pipe(
            switchMap(tokenWithUserid => {

                console.log(tokenWithUserid);
               const headers = new HttpHeaders()
                        .set('authtoken', tokenWithUserid[0])
                        .set('userid', tokenWithUserid[1]);
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