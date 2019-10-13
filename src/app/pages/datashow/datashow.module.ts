import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatashowRoutingModule } from './datashow-routing.module';
import { DatashowListComponent } from './datashow-list/datashow-list.component';
import { DatashowFormComponent } from './datashow-form/datashow-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DatashowListComponent, DatashowFormComponent],
  imports: [
    CommonModule,
    DatashowRoutingModule,
    SharedModule
  ]
})
export class DatashowModule { }
