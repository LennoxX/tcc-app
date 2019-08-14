import { BaseResourceService } from 'src/app/shared/services/base.resource.service';
import { Injectable, Injector } from '@angular/core';
import { Datashow } from '../models/datashow.model';

@Injectable({
  providedIn: 'root'
})
export class DatashowService extends BaseResourceService<Datashow> {

  constructor(public injector: Injector) {
    super('datashow', injector);
  }
}
