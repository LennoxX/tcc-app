
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfessorListComponent } from './professor-list/professor-list.component';
import { ProfessorRoutingModule } from './professor-routing.module';
import { ProfessorFormComponent } from './professor-form/professor-form.component';

@NgModule({
  declarations: [ProfessorListComponent, ProfessorFormComponent],
  imports: [
    CommonModule,
    ProfessorRoutingModule,
    SharedModule
  ]
})
export class ProfessorModule { }
