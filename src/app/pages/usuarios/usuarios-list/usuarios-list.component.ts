import { Component, OnInit, Injector } from '@angular/core';
import { Usuario } from '../shared/models/usuario.model';
import { UsuarioService } from '../shared/services/usuario.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ConfirmationService } from 'primeng/api';



@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent extends BaseResourceListComponent<Usuario> implements OnInit {

  niveis = new Array();
  status = new Array();
  cursos = new Array();
  usuarios: Usuario[] = new Array();
  constructor(private usuarioService: UsuarioService, private confirmationService: ConfirmationService, protected injector: Injector) {
    super(usuarioService, injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.filters.set('nome', { filtro: '', type: 'input' });
    this.filters.set('nivel', { filtro: '', type: 'input' });
    this.filters.set('status', { filtro: '', type: 'input' });
    this.filters.set('email', { filtro: '', type: 'input' });
    this.niveis = [
      { label: 'Administrador', value: 'ADMIN' },
      { label: 'Usuário', value: 'USUARIO' },
    ];
    this.status = [
      { label: 'Sim', value: 'true' },
      { label: 'Não', value: 'false' },
    ];
    this.cursos = [
      { label: 'Engenharia de Computação', value: 'COMPUTACAO' },
      { label: 'Engenharia Civil', value: 'CIVIL' },
      { label: 'Engenharia Mecânica', value: 'MECANICA' },
      { label: 'Engenharia de Produção', value: 'PRODUCAO' },
      { label: 'Curso de Formação de Oficiais', value: 'CFO' },
    ];
  }

  pesquisar() {
    if (this.filters.get('nivel').filtro == null || this.filters.get('nivel').filtro === '') {
      this.load(0, this.filters.get('nome').filtro, this.filters.get('status').filtro != null ? this.filters.get('status').filtro.value : '', '', this.filters.get('email').filtro);
    } else if (this.filters.get('status').filtro == null || this.filters.get('status').filtro === '') {
      this.load(0, this.filters.get('nome').filtro,'', this.filters.get('nivel').filtro.value,this.filters.get('email').filtro );
    }else {
      this.load(0, this.filters.get('nome').filtro, this.filters.get('status').filtro.value, this.filters.get('nivel').filtro.value,this.filters.get('email').filtro );
    }
  }

  load(page, matricula, nome, curso, email) {
    this.usuarioService
      .getByParameters(page, this.count, matricula, nome, curso, email)
      .subscribe(
        pages => {
          console.log(pages)
          this.resources = pages.content;
          this.totalRecords = pages.totalElements;
        },
      );
  }

  loadLazy(event) {
    this.pageIndex = event.first / event.rows;
    this.loadResourcesLazy(this.pageIndex);
  }
  

}
