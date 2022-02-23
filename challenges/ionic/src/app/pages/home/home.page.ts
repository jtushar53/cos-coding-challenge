import { Component, OnInit } from '@angular/core';
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
  constructor(private auction: AuctionService) {}

  ngOnInit(){
    this.$auctions = this.auction.getAllAuctionForSalesMan().pipe(
      map((auctions) => auctions.sort((firstAuction, secondAuction) => secondAuction.currentHighestBidValue - firstAuction.currentHighestBidValue))
    );
  }

}
