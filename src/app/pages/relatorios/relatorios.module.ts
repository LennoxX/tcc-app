import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import {ChartModule} from 'primeng/chart';


@NgModule({
  declarations: [RelatoriosComponent],
  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    SharedModule,
    ChartModule
  ]
})
export class RelatoriosModule { }
