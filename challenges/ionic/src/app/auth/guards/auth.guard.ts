// Below code was taken somewhere from github which i dont remember :(
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { from, Observable, of, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(state);
      return this._check('auth');
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(state);
    return this._check('auth');
  }

  canLoad() {
    return this._check('');
  }

  private _check(redirectURL: string): Observable<boolean>
    {
        return this._authService.check()
                   .pipe(
                       switchMap((authenticated) => {
                        if (!authenticated)
                        {
                           return of(false)
                        }
                        return of(true);
                       }),
                       tap({
                          next: (authenticated: any) => !authenticated && from(this._router.navigate(['auth/login']) ),
                          error: err => throwError('unauthorised user')
                        })
                   );
    }

}
