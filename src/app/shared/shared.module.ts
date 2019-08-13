import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { BreadCrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [HeaderNavComponent, SideMenuComponent, BreadCrumbComponent],
  imports: [
    RouterModule,
    CommonModule,
    ToastrModule.forRoot()
  ],
  exports: [HeaderNavComponent, SideMenuComponent, BreadCrumbComponent]
})
export class SharedModule { }
