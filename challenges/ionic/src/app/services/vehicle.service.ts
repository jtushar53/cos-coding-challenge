import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { delay, shareReplay, startWith, switchMap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class vehicleService {
  private cache= new Map();
  constructor(private _httpClient: HttpClient, private auth: AuthService) { }

  getVehcileByActionId(uuid): Observable<any>
  {
    if(!this.cache.get(uuid)) {
      const getVehicleInfo = this.auth.getUserInfo().pipe(
        switchMap((userInfo) => {
          return this._httpClient.get(`auction/salesman/${userInfo?.userId}/${uuid}`);
        }),
        shareReplay(1)
      ); 
      this.cache.set(uuid, getVehicleInfo);
    }
    return this.cache.get(uuid);
       
  }
}
