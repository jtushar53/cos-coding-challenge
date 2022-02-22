import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, interval, Observable, throwError } from 'rxjs';
import { catchError, delay, startWith, switchMap, switchMapTo, tap } from 'rxjs/operators';
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
        return from(this.auth.getUserId()).pipe(
          switchMap((userId) => {
            return this._httpClient.get(`auction/salesman/${userId}/_all/bidding-data`)
          })
        );
      })
    )
  }
}
