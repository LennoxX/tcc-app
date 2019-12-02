import { BaseResourceService } from 'src/app/shared/services/base.resource.service';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseResourceService<Usuario> {
  

  constructor(public injector: Injector) {
    super('usuario', injector);
  }


 
  updatePassword(resource: Usuario, novaSenha: string): Observable<Usuario> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}/password`;
    return this.http.put(url, resource,  {params: {'novaSenha': novaSenha}}).pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }

  getByParameters(page: number,
                  size: number,
                  nome: string,
                  status: string,
                  nivel: string,
                  email: string
                  ): Observable<Page<Usuario>> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}/${page}/${size}/parameters`;
    return this.http.get(url, {
      params: {
        nome: nome,
        status: status,
        nivel: nivel,
        email: email,
      }
    }).pipe(
      catchError(this.handleError),
      map(this.jsonDataPagesToResources)
    );
  }
}
