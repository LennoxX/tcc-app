import { ProfessorListComponent } from './professor-list/professor-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfessorFormComponent } from './professor-form/professor-form.component';

const routes: Routes = [
  {path: '', component: ProfessorListComponent},
  {path: 'new', component: ProfessorFormComponent},
  {path: ':id/edit', component: ProfessorFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
