
import { Professor } from './../shared/models/professor.model';
import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/shared/models/page';
import { ProfessorService } from '../shared/services/professor.service';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit {


  page = 0;
  count = 10;
  totalRecords: number;
  pageIndex: number;
  pages: Page<Professor> = new Page<Professor>();
  filters = new Map();
  cursos = new Array();


  professores: Professor[] = new Array();

  constructor(private professorService: ProfessorService) { }

  ngOnInit() {
    this.getProfessores(this.page, this.count);
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
    this.getProfessores(this.pageIndex, this.count);
  }


  getProfessores(page: number, count: number) {
    this.professorService
      .findAll(page, count)
      .subscribe(
        pages => {
          pages = pages;
          this.professores = pages.content;
          this.totalRecords = pages.totalElements;
        },
        error => {
          console.log(error);
        }
      );
  }

  pesquisar() {
    // NO CASO DE LIMPAR A SELEÇÃO
    if (
      this.filters.get('curso').filtro == null ||
      this.filters.get('curso').filtro === ''
    ) {
      this.load(0, this.filters.get('matricula').filtro, this.filters.get('nome').filtro, '');
    } else {
      this.load(
        0,
        this.filters.get('matricula').filtro,
        this.filters.get('nome').filtro,
        this.filters.get('curso').filtro.value,
      );
    }
  }

  load(page, matricula, nome, curso) {
    this.professorService
      .getByParameters(page, this.count, matricula, nome, curso)
      .subscribe(
        pages => {
          this.professores = pages.content;
          this.totalRecords = pages.totalElements;
        },
        err => console.error(err)
      );
  }

  exibirCurso(curso) {
    return this.cursos.filter(item => {
      return item.value === curso;
    })[0].label;
  }

}
