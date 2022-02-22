import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuctionService } from 'src/app/services/auction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  $auctions
  constructor(private userService: UserService, private auction: AuctionService) {}

  ngOnInit(){
    this.$auctions = this.auction.getAllAuctionForSalesMan().pipe(
      map((auctions) => auctions.sort((firstAuction, secondAuction) => secondAuction.currentHighestBidValue - firstAuction.currentHighestBidValue))
    );
  }

}
