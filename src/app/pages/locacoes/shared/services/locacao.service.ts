import { BaseResourceService } from 'src/app/shared/services/base.resource.service';
import { Injectable, Injector } from '@angular/core';
import { Locacao } from '../models/locacao.model';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { catchError, map } from 'rxjs/operators';
import { Response } from 'src/app/shared/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class LocacaoService extends BaseResourceService<Locacao> {


  constructor(public injector: Injector) {
    super('locacao', injector);
  }

  getByParameters(page: number,
                  size: number,
                  professor: string,
                  datashow: string,
                  status: string): Observable<Page<Locacao>> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}/${page}/${size}/parameters`;
    return this.http.get(url, {
      params: {
        professor: professor,
        datashow: datashow,
        status: status,
      }
    }).pipe(
      catchError(this.handleError),
      map(this.jsonDataPagesToResources)
    );
  }

  getAllEmAndamento() {

    const url = `${this.configService.getApiUrl()}${this.apiPath}/abertas`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResources)
    );

  }
  concluir(locacao: Locacao) {

    const url = `${this.configService.getApiUrl()}${this.apiPath}/${locacao.id}/finalizar`;
    return this.http.post(url, locacao.id).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    );

  }

}
