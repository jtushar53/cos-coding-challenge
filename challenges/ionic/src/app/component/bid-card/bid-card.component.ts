import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomController, IonContent } from '@ionic/angular';
import { vehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'bid-card',
  templateUrl: './bid-card.component.html',
  styleUrls: ['./bid-card.component.scss'],
})
export class BidCardComponent implements OnInit, AfterViewInit {
  @Input() auction;
  @Input() view: IonContent;
  $vehicle;
  private observer: IntersectionObserver;
  @ViewChild(BidCardComponent) bidcard: BidCardComponent;
  @ViewChild('img') vehicleImg: ElementRef;
  constructor(private vehicle: vehicleService, private renderer: Renderer2, private ele: ElementRef, private domCtrl: DomController) { }

  ngOnInit() {
 
  }

  async ngAfterViewInit(){
    const scrollEle =  await this.view.getScrollElement();
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if(entry.isIntersecting){
          this.$vehicle = this.vehicle.getVehcileByActionId(this.auction.uuid)
          this.$vehicle.subscribe(vehicle => {
            console.log(vehicle.associatedVehicle.vehicleImages)
            this.auction['vehicle'] = vehicle;
            if(vehicle.associatedVehicle.vehicleImages.length > 0){
              this.domCtrl.write(() => {
                console.log(vehicle.associatedVehicle.vehicleImages[0].url)
                this.vehicleImg.nativeElement.src = vehicle.associatedVehicle.vehicleImages[0].url;
              })
            }
          })
        }
      });
    }, {threshold: [0.4], root: scrollEle});
      this.observer.observe(this.ele.nativeElement);
    }
}
