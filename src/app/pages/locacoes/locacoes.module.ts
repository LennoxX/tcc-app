import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocacoesRoutingModule } from './locacoes-routing.module';
import { LocacoesListComponent } from './locacoes-list/locacoes-list.component';
import { LocacoesFormComponent } from './locacoes-form/locacoes-form.component';


@NgModule({
  declarations: [LocacoesListComponent, LocacoesFormComponent],
  imports: [
    CommonModule,
    LocacoesRoutingModule,
    SharedModule
  ]
})
export class LocacoesModule { }
