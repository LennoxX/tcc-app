import { UserService } from './../services/user.service';
import { Usuario } from './../../pages/usuarios/shared/usuario.model';
import { TokenService } from '../services/token.service';
import { ConfigService } from '../../shared/services/config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';



@Injectable({
  providedIn: 'root'
})


export class AdminGuard implements CanActivate {

  usuario: Usuario = new Usuario();
  constructor(private router: Router,
              private http: HttpClient,
              private configService: ConfigService,
              private tokenService: TokenService,
              private userService: UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.tokenService.getToken()) {
      this.http.post(`${this.configService.getAuthUrl()}valid/token`, this.tokenService.getToken()).subscribe((res) => {
        this.userService.getByToken().subscribe((user) => {
          this.usuario = user;
          if (this.usuario.niveis.indexOf('ADMIN') !== -1) {
            return true;
          } else {
            this.router.navigateByUrl('/error/forbidden');
            return false;
          }
        });
      },
        (err) => {
          this.router.navigateByUrl('/auth/login');
          this.tokenService.deleteToken();
          return false;
        });
    } else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
}



