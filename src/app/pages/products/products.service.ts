import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_SEGURIDAD } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private SERVER = API_ENDPOINT_SEGURIDAD ;
  private Products = this.SERVER + '/products';
 
  constructor(
    private http: HttpClient,
    
  ) { }
  

  getProducts(): Observable<any> {       
    return this.http.get<any>(this.Products + '/');
  }
  getProduct(id : any): Observable<any> {       
    return this.http.get<any>(this.Products + '/' + id);
  }
  createProducts(data : any): Observable<any> {       
    return this.http.post<any>(this.Products + '/' , data);
  }
  updateProduct(id : any , data : any): Observable<any> {       
    return this.http.put<any>(this.Products + '/' + id , data );
  }
  deleteProduct(id : any): Observable<any> {       
    return this.http.delete<any>(this.Products + '/' + id);
  }
}
