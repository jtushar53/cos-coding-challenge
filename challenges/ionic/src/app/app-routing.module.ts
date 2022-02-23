import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { BaseAuthPage } from './auth/pages/base-auth/base-auth.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/pages/base-auth/base-auth.module').then( m => m.BaseAuthPageModule),
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
  },
  {
    path: 'vehicle-info',
    loadChildren: () => import('./pages/vehicle-info/vehicle-info.module').then( m => m.VehicleInfoPageModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
