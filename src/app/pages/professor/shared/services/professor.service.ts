import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base.resource.service';
import { Professor } from '../models/professor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService extends BaseResourceService<Professor> {

  constructor(public injector: Injector) {
    super('professor', injector);
  }
}
