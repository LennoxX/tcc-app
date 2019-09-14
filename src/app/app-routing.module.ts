import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomeModule', canActivate: [AuthGuard] },
  { path: 'professor', loadChildren: './pages/professor/professor.module#ProfessorModule', canActivate: [AuthGuard] },
  { path: 'datashow', loadChildren: './pages/datashow/datashow.module#DatashowModule', canActivate: [AuthGuard] },
  { path: 'usuario', loadChildren: './pages/usuarios/usuarios.module#UsuariosModule', canActivate: [AdminGuard] },
  { path: 'locacoes', loadChildren: './pages/locacoes/locacoes.module#LocacoesModule', canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './pages/security/security.module#SecurityModule' },
  { path: 'error', loadChildren: './core/pages/errors/errors.module#ErrorsModule' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
