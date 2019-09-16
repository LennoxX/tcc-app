import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';


@NgModule({
  declarations: [UsuariosListComponent, UsuariosFormComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ]
})
export class UsuariosModule { }
