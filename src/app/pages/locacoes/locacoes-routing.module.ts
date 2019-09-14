import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocacoesListComponent } from './locacoes-list/locacoes-list.component';


const routes: Routes = [
  {path: '', component: LocacoesListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocacoesRoutingModule { }
