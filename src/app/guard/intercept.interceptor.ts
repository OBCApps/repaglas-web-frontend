import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralFunctions } from '../models/functions/alerts-function';
import { catchError, tap } from 'rxjs/operators';
@Injectable()
export class InterceptInterceptor extends GeneralFunctions implements HttpInterceptor {

  constructor(private inj: Injector) {
    super()
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const session = JSON.parse(localStorage.getItem('authorizationCJPWeb')!);
    let token = session != null ? session.accessToken : '';

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    console.log('entrando', request)
    return next.handle(request).pipe(
      tap(
        event => this.handleResponse(request, event),
        error => this.handleError(request, error)
      )
    );


  }
  handleResponse(req: HttpRequest<any>, event: any) {

  }

  handleError(req: HttpRequest<any>, errorResponse: HttpErrorResponse) {

    console.log(errorResponse);

    if (errorResponse.status === 407) {
      //407 Session expirada
      this.error_function(errorResponse);
      /* this.route.navigate([""]); */
    }

    if (errorResponse.status === 504) {
      //504 Servidor de seguridad apagado
      this.error_function(errorResponse);
      /* this.route.navigate([""]); */
    }

    if (errorResponse.status === 0) {
      //0 Api actual apagada
      this.error_function("Los servicios no están activos, reintentar en unos minutos");
      /* this.route.navigate([""]); */
    }

    if (errorResponse.status === 500) {
      //500 Error de aplicación no controlado
      this.error_function(errorResponse);
      // /* this.route.navigate([""]); */
    }

    if (errorResponse.status === 401) {
      //401, lo mandamos al login
      this.error_function('No tiene accesos, debe ingresar sus credenciales');
      /* this.route.navigate([""]); */
    }
  }
}
