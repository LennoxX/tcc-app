import { LocacoesFormComponent } from './locacoes-form/locacoes-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocacoesListComponent } from './locacoes-list/locacoes-list.component';


const routes: Routes = [
  {path: '', component: LocacoesListComponent},
  {path: ':id/edit', component: LocacoesFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocacoesRoutingModule { }
