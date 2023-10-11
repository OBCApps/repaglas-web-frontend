import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_SEGURIDAD } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private SERVER = API_ENDPOINT_SEGURIDAD ;
  private proveedores = this.SERVER + '/proveedores';//Ruta en render para las operaciones
 
  constructor(
    private http: HttpClient,
    
  ) { }
  

  getSuppliers(): Observable<any> {       
    return this.http.get<any>(this.proveedores + '/');
  }
  getSupplier(id : any): Observable<any> {       
    return this.http.get<any>(this.proveedores + '/' + id);
  }
  createSupplier(data : any): Observable<any> {       
    return this.http.post<any>(this.proveedores + '/' , data);
  }
  updateSupplier(id : any , data : any): Observable<any> {       
    return this.http.put<any>(this.proveedores + '/' + id , data );
  }
  deleteSupplier(id : any): Observable<any> {       
    return this.http.delete<any>(this.proveedores + '/' + id);
  }
}
