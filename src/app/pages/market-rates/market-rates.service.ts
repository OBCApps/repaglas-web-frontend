import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_SEGURIDAD } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MarketRatesService {
  private SERVER = API_ENDPOINT_SEGURIDAD ;
  private cotizacion = this.SERVER + '/cotizacion';
  private cotizacion_detalle = this.SERVER + '/cotizacion_detalle/cotizacion';
 
  constructor(
    private http: HttpClient,
    
  ) { }
  

  getMarketRates(): Observable<any> {       
    return this.http.get<any>(this.cotizacion + '/');
  }
  getMarketDetail(id : any): Observable<any> {       
    return this.http.get<any>(this.cotizacion + '/' + id);
  }
  getMarketDetailProduct(id : any): Observable<any> {       
    return this.http.get<any>(this.cotizacion_detalle + '/' + id);
  }
  createMarketRates(data : any): Observable<any> {       
    return this.http.post<any>(this.cotizacion + '/' , data);
  }
  updateMarketDetail(id : any , data : any): Observable<any> {       
    return this.http.put<any>(this.cotizacion + '/' + id , data );
  }
  deleteMarketRate(id : any): Observable<any> {       
    return this.http.delete<any>(this.cotizacion + '/' + id);
  }
}
