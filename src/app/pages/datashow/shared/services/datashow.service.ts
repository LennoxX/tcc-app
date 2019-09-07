import { BaseResourceService } from 'src/app/shared/services/base.resource.service';
import { Injectable, Injector } from '@angular/core';
import { Datashow } from '../models/datashow.model';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatashowService extends BaseResourceService<Datashow> {

  constructor(public injector: Injector) {
    super('datashow', injector);
  }

  getByParameters(page: number,
                  size: number,
                  identificacao: string,
                  numTombamento: string,
                  status: string): Observable<Page<Datashow>> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}/${page}/${size}/parameters`;
    return this.http.get(url, {
      params: {
        identificacao: identificacao,
        numTombamento: numTombamento,
        status: status,
      }
    }).pipe(
      catchError(this.handleError),
      map(this.jsonDataPagesToResources)
    );
  }
}
