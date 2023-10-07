import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_SEGURIDAD } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private SERVER = API_ENDPOINT_SEGURIDAD ;
  private loginRest = this.SERVER ;
 
  constructor(
    private http: HttpClient,
    
  ) { }
  

  getUsers( data : any): Observable<any> {       
    return this.http.get<any>(this.loginRest + '/users/profile/3');
  }
  

}
