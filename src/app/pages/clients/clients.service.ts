import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_SEGURIDAD } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private SERVER = API_ENDPOINT_SEGURIDAD ;
  private clients = this.SERVER + '/clientes';
 
  constructor(
    private http: HttpClient,
    
  ) { }
  

  getClients(): Observable<any> {       
    return this.http.get<any>(this.clients + '/');
  }
  getClient(id : any): Observable<any> {       
    return this.http.get<any>(this.clients + '/' + id);
  }
  getClientByRUC(id : any): Observable<any> {       
    return this.http.get<any>(this.clients + '/ruc/' + id);
  }
  createClients(data : any): Observable<any> {       
    return this.http.post<any>(this.clients + '/' , data);
  }
  updateClient(id : any , data : any): Observable<any> {       
    return this.http.put<any>(this.clients + '/' + id , data );
  }
  deleteClient(id : any): Observable<any> {       
    return this.http.delete<any>(this.clients + '/' + id);
  }
}
