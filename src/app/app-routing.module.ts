import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  { path: '', redirectTo: '/home' , pathMatch: 'full'},
  { path: 'home', loadChildren: './pages/home/home.module#HomeModule' },
  { path: 'professor', loadChildren: './pages/professor/professor.module#ProfessorModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
