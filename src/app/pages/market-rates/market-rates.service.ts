import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_SEGURIDAD } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MarketRatesService {
  private SERVER = API_ENDPOINT_SEGURIDAD ;
  private clients = this.SERVER + '/cotizacion';
 
  constructor(
    private http: HttpClient,
    
  ) { }
  

  getMarketRates(): Observable<any> {       
    return this.http.get<any>(this.clients + '/');
  }
  getMarketDetail(id : any): Observable<any> {       
    return this.http.get<any>(this.clients + '/' + id);
  }
  createMarketRates(data : any): Observable<any> {       
    return this.http.post<any>(this.clients + '/' , data);
  }
  updateMarketDetail(id : any , data : any): Observable<any> {       
    return this.http.put<any>(this.clients + '/' + id , data );
  }
  deleteMarketRate(id : any): Observable<any> {       
    return this.http.delete<any>(this.clients + '/' + id);
  }
}
