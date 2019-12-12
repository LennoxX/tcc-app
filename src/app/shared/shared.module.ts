import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { BreadCrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';
import { TooltipModule } from 'primeng/tooltip';
import {InputSwitchModule} from 'primeng/inputswitch';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ListboxModule} from 'primeng/listbox';
import {CalendarModule} from 'primeng/calendar';




@NgModule({
  declarations: [HeaderNavComponent, SideMenuComponent, BreadCrumbComponent, HeaderComponent, FooterComponent],
  imports: [
    RouterModule,
    CommonModule,
    ToastrModule.forRoot(),
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    RadioButtonModule,
    FieldsetModule,
    TooltipModule,
    InputSwitchModule,
    SelectButtonModule,
    CalendarModule,
    ListboxModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish
    })
  ],
  exports: [
    HeaderNavComponent,
    SideMenuComponent,
    CalendarModule,
    BreadCrumbComponent,
    TableModule,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    RadioButtonModule,
    FieldsetModule,
    TooltipModule,
    InputSwitchModule,
    SelectButtonModule,
    ListboxModule,
    NgxLoadingModule
  ]
})
export class SharedModule { }
