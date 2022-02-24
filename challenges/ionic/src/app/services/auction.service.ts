import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable} from 'rxjs';
import { delay, startWith, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  constructor(private _httpClient: HttpClient, private auth: AuthService) { }

  getAllAuctionForSalesMan(): Observable<any>
  {
    return  interval(20000).pipe(
      delay(100),
      startWith(0),
      switchMap(() => {
        return this.auth.getUserInfo().pipe(
          switchMap((userInfo) => {
            return this._httpClient.get(`auction/salesman/${userInfo?.userId}/_all/bidding-data`)
          })
        );
      })
    )
  }
}
