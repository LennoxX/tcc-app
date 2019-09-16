import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/models/usuario.model';
import { Page } from 'src/app/shared/models/page';
import { UsuarioService } from '../shared/services/usuario.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  page = 0;
  count = 10;
  totalRecords: number;
  pageIndex: number;
  pages: Page<Usuario> = new Page<Usuario>();
  filters = new Map();
  datashowStatus = new Array();
  possuiEntradas = new Array();

  usuarios: Usuario[] = new Array();

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  loadLazy(event) {
    this.pageIndex = event.first / event.rows;
    this.getUsuarios(this.pageIndex, this.count);
  }

  getUsuarios(page: number, count: number) {
    this.usuarioService
      .findAll(page, count)
      .subscribe(
        pages => {
          pages = pages;
          this.usuarios = pages.content;
          this.totalRecords = pages.totalElements;
        },
        error => {
          console.log(error);
        }
      );
  }

}
