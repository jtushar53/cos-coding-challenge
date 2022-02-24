import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.page.html',
  styleUrls: ['./vehicle-info.page.scss'],
})
export class VehicleInfoPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  vehicle;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.vehicle = history.state.vehicle;
    console.log( this.vehicle);
  }

}
