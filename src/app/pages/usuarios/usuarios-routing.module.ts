
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { UserGuard } from 'src/app/core/guards/user.guard';


const routes: Routes = [
  {path: '', component: UsuariosListComponent,  canActivate: [AdminGuard] },
  {path: ':id/edit', component: UsuariosFormComponent, canActivate: [UserGuard]},
  {path: 'new', component: UsuariosFormComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
