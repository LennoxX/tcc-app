import { BaseResourceService } from 'src/app/shared/services/base.resource.service';
import { Injectable, Injector } from '@angular/core';
import { Locacao } from '../models/locacao.model';

@Injectable({
  providedIn: 'root'
})
export class LocacaoService extends BaseResourceService<Locacao> {

  constructor(public injector: Injector) {
    super('locacao', injector);
  }
}
