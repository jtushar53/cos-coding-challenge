import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.page.html',
  styleUrls: ['./vehicle-info.page.scss'],
})
export class VehicleInfoPage implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    debugger;
    const auctionId = this.route.snapshot.queryParamMap.get('auctionId');
    console.log(auctionId)
  }

}
