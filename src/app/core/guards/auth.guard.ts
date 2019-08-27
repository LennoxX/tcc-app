import { TokenService } from './../services/token.service';
import { ConfigService } from './../../shared/services/config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';



@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient, private configService: ConfigService, private tokenService: TokenService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.tokenService.getToken()) {
      this.http.post(`${this.configService.getAuthUrl()}valid/token`, this.tokenService.getToken()).subscribe((res) => {
        return true;
      },
        (err) => {
          this.router.navigateByUrl('/auth/login');
          this.tokenService.deleteToken();
          return false;
        });
      return true;
    } else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
}



