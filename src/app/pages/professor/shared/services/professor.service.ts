import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base.resource.service';
import { Professor } from '../models/professor.model';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService extends BaseResourceService<Professor> {

  constructor(public injector: Injector) {
    super('professor', injector);
  }

  getByParameters(page: number,
                  size: number,
                  matricula: string,
                  nome: string,
                  curso: string): Observable<Page<Professor>> {
      const url = `${this.configService.getApiUrl()}${this.apiPath}/${page}/${size}/parameters`;
      return this.http.get(url, {
      params: {
        matricula: matricula,
        nome: nome,
        curso: curso
      }
    }).pipe(
      catchError(this.handleError),
      map(this.jsonDataPagesToResources)
    );
  }

}
