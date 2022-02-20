import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseAuthPage } from './base-auth.page';

const routes: Routes = [
  {
    path: '',
    component: BaseAuthPage,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)},
      //...can have other pages like register, forgot password, etc
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseAuthPageRoutingModule {}
