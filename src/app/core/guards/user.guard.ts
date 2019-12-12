import { UserService } from '../services/user.service';
import { Usuario } from '../../pages/usuarios/shared/models/usuario.model';
import { TokenService } from '../services/token.service';
import { ConfigService } from '../../shared/services/config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';



@Injectable({
  providedIn: 'root'
})


export class UserGuard implements CanActivate {
  usuario: Usuario = new Usuario();
  constructor(private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private tokenService: TokenService,
    private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const idUsuario = +route.params.id;
    if (this.tokenService.getToken()) {
      this.http.post(`${this.configService.getAuthUrl()}valid/token`,
        this.tokenService.getToken()).subscribe((res) => {
          this.userService.getByToken().subscribe((user) => {
            this.usuario = user;
            if (this.usuario.nivel == 'ADMIN') {
              return true;
            } else {
              if (this.usuario.id === idUsuario) {
                return true;
              } else {
                this.router.navigateByUrl('/error/forbidden');
                return false;
              }}});
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
    return true;
  }
}



