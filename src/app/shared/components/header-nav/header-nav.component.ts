import { Usuario } from '../../../pages/usuarios/shared/models/usuario.model';
import { UserService } from './../../../core/services/user.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit, AfterContentChecked {
  usuario: Usuario
  constructor(private router: Router, public userService: UserService) {}

  ngOnInit() {}

  ngAfterContentChecked() {
    this.usuario = this.userService.getInstance();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('auth/login');
  }
}
