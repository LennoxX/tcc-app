import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NotFoundComponent, ForbiddenComponent],
  imports: [
    CommonModule,
    ErrorsRoutingModule,
    SharedModule
  ]
})
export class ErrorsModule { }
