import { BaseResourceService } from "src/app/shared/services/base.resource.service";
import { Usuario } from "./../../pages/usuarios/shared/usuario.model";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService extends BaseResourceService<Usuario> {
  static usuario: Usuario = null;
  constructor(protected injector: Injector) {
    super("usuario", injector);
  }

  getInstance() {
    if (UserService.usuario == null) {
      this.getByToken().subscribe(
        usuario => {
          this.setUsuarioLogado(usuario);
          return UserService.usuario;
        },
        error => console.log(error)
      );
    } else {
      return UserService.usuario;
    }
  }
  setUsuarioLogado(usuario: Usuario) {
    UserService.usuario = usuario;
  }

  getByToken(): Observable<Usuario> {
    let url = `${this.configService.getApiUrl()}usuario/token/`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    );
  }
}
