import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BaseAuthPageModule } from './pages/base-auth/base-auth.module';
import { AuthService } from './auth.service';
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

export const AUTH_TOKEN_INTERCEPTOR_FILTER =
       new InjectionToken<(req: HttpRequest<any>) => boolean>('Nebular Interceptor Filter');

export function filterInterceptorRequest(req: HttpRequest<any>) {
  return ['/authentication/',
          'anyotherurl'
         ]
    .some(url => req.url.includes(url));
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    BaseAuthPageModule,
    HttpClientModule
  ],
  providers: [
    {
        provide : HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi   : true
    },
    { provide: AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest }
]
})
export class AuthModule { }
