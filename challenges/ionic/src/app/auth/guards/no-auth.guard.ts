import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._check();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._check();
  }


  private _check(): Observable<boolean>
  {
      return this._authService.check()
      .pipe(
          switchMap((authenticated) => {
              if ( authenticated )
              {
                  this._router.navigate(['']);
                  return of(false);
              }
              return of(true);
          })
      );
  }
}
