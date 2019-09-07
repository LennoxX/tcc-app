import { DatashowListComponent } from './datashow-list/datashow-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatashowFormComponent } from './datashow-form/datashow-form.component';


const routes: Routes = [
  { path: '', component: DatashowListComponent },
  { path: ':id/edit', component: DatashowFormComponent },
  { path: 'new', component: DatashowFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatashowRoutingModule { }
