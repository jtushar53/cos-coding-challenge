import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaseAuthPageRoutingModule } from './base-auth-routing.module';

import { BaseAuthPage } from './base-auth.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaseAuthPageRoutingModule,
    RouterModule
  ],
  declarations: [BaseAuthPage]
})
export class BaseAuthPageModule {}
