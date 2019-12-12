
import { Professor } from './../shared/models/professor.model';
import { Component, OnInit, Injector } from '@angular/core';
import { Page } from 'src/app/shared/models/page';
import { ProfessorService } from '../shared/services/professor.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent extends BaseResourceListComponent<Professor> implements OnInit {

  cursos = new Array();

  constructor(private professorService: ProfessorService, private confirmationService: ConfirmationService, protected injector: Injector) {
    super(professorService, injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.filters.set('matricula', { filtro: '', type: 'input' });
    this.filters.set('nome', { filtro: '', type: 'input' });
    this.filters.set('curso', { filtro: '', type: 'input' });
    this.cursos = [
      { label: 'Engenharia de Computação', value: 'COMPUTACAO' },
      { label: 'Engenharia Civil', value: 'CIVIL' },
      { label: 'Engenharia Mecânica', value: 'MECANICA' },
      { label: 'Engenharia de Produção', value: 'PRODUCAO' },
      { label: 'Curso de Formação de Oficiais', value: 'CFO' },
    ];
  }

  loadLazy(event) {
    this.pageIndex = event.first / event.rows;
    this.loadResourcesLazy(this.pageIndex);
  }

  pesquisar() {
    if (this.filters.get('curso').filtro == null || this.filters.get('curso').filtro === '') {
      this.load(0, this.filters.get('matricula').filtro, this.filters.get('nome').filtro, '');
    } else {
      this.load(0, this.filters.get('matricula').filtro, this.filters.get('nome').filtro, this.filters.get('curso').filtro.value);
    }
  }

  load(page, matricula, nome, curso) {
    this.professorService
      .getByParameters(page, this.count, matricula, nome, curso)
      .subscribe(
        pages => {
          this.resources = pages.content;
          this.totalRecords = pages.totalElements;
        },
      );
  }

  exibirCurso(curso) {
    return this.cursos.filter(item => {
      return item.value === curso;
    })[0].label;
  }

}
