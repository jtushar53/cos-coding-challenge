import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AuctionService } from 'src/app/services/auction.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  $auctions
  @ViewChild(IonContent) content: IonContent;
  constructor(private auctionService: AuctionService) {}

  ngOnInit(){
    this.$auctions = this.auctionService.getAllAuctionForSalesMan().pipe(
      map((auctions) => auctions.sort((firstAuction, secondAuction) => secondAuction.currentHighestBidValue - firstAuction.currentHighestBidValue))
    );
  }

  itemTrackBy(index: number, auction) {
    return auction.uuid;
  }
}
