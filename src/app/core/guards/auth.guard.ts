import { ConfigService } from './../../shared/services/config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';



@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient, private configService: ConfigService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('token')) {
      this.http.post(`${this.configService.getAuthUrl()}valid/token`, sessionStorage.getItem('token')).subscribe((res) => {
        return true;
      },
        (err) => {
          this.router.navigateByUrl('/auth/login');
          sessionStorage.removeItem('token');
          return false;
        });
      return true;
    } else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
}



