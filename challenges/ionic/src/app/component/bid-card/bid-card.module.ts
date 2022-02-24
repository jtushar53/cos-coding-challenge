import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidCardComponent } from './bid-card.component';
import { IonicModule } from '@ionic/angular';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [BidCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    CountdownModule
  ],
  exports: [BidCardComponent]
})
export class BidCardModule { }
