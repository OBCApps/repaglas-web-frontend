import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT_SEGURIDAD } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private SERVER = API_ENDPOINT_SEGURIDAD ;
  private loginRest = this.SERVER + '/autorizacion/seguridad/login';
 
  constructor(
    private http: HttpClient,
    
  ) { }

  

}
