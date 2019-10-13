
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor() {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest: any;
    if (sessionStorage.getItem('token') != null) {
      authRequest = req.clone({
        setHeaders: {
          'Authorization': sessionStorage.getItem('token')
        }
      });
      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }

}
