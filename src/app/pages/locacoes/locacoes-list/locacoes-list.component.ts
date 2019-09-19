import { Locacao } from './../shared/models/locacao.model';
import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/shared/models/page';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocacaoService } from '../shared/services/locacao.service';

@Component({
  selector: 'app-locacoes-list',
  templateUrl: './locacoes-list.component.html',
  styleUrls: ['./locacoes-list.component.css']
})
export class LocacoesListComponent implements OnInit {

 
  page = 0;
  count = 10;
  totalRecords: number;
  pageIndex: number;
  pages: Page<Locacao> = new Page<Locacao>();
  filters = new Map();
  

  locacoes: Locacao[] = new Array();



  constructor(private locacaoService: LocacaoService, private confirmationService: ConfirmationService, protected messageService: MessageService) { }



  ngOnInit() {
    this.getLocacoes(this.page, this.count);
   
   
  }


  loadLazy(event) {
    this.pageIndex = event.first / event.rows;
    this.getLocacoes(this.pageIndex, this.count);
  }


  getLocacoes(page: number, count: number) {
    this.locacaoService
      .findAll(page, count)
      .subscribe(
        pages => {
          pages = pages;
          this.locacoes = pages.content;
          this.totalRecords = pages.totalElements;
        },
        error => {
          console.log(error);
        }
      );
  }
/* 
  pesquisar() {
    // NO CASO DE LIMPAR A SELEÇÃO
    if (
      this.filters.get('status').filtro == null ||
      this.filters.get('status').filtro === ''
    ) {
      this.load(0, this.filters.get('identificacao').filtro, this.filters.get('numTombamento').filtro, '');
    } else {
      this.load(
        0,
        this.filters.get('identificacao').filtro,
        this.filters.get('numTombamento').filtro,
        this.filters.get('status').filtro.value
      );
    }
  } */

 /*  load(page, identificacao, numTombamento, status) {
    this.datashowService
      .getByParameters(page, this.count, identificacao, numTombamento, status)
      .subscribe(
        pages => {
          this.locacoes = pages.content;
          this.totalRecords = pages.totalElements;
        },
        err => console.error(err)
      );
  } */

  protected actionsForSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Solicitação Processada com Sucesso!'
    });
  }

  protected actionsForError(error) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: error
    });
  }
}
