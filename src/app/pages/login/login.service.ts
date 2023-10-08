import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_SEGURIDAD } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private SERVER = API_ENDPOINT_SEGURIDAD ;
  private user = this.SERVER + '/users';
 
  constructor(
    private http: HttpClient,
    
  ) { }
  

  getUsers( data : any): Observable<any> {       
    return this.http.get<any>(this.user + '/login/3');
  }

  login_service(data : any): Observable<any> {       
    return this.http.post<any>(this.user + '/login' , data);
  }

}
