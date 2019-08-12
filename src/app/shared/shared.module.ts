import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { BreadCrumbComponent } from './components/breadcrumb/breadcrumb.component';



@NgModule({
  declarations: [HeaderNavComponent, SideMenuComponent, BreadCrumbComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeaderNavComponent, SideMenuComponent, BreadCrumbComponent]
})
export class SharedModule { }
