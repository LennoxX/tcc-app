import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { BreadCrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [HeaderNavComponent, SideMenuComponent, BreadCrumbComponent],
  imports: [
    RouterModule,
    CommonModule,
    ToastrModule.forRoot(),
    TableModule
  ],
  exports: [HeaderNavComponent, SideMenuComponent, BreadCrumbComponent, TableModule]
})
export class SharedModule { }
