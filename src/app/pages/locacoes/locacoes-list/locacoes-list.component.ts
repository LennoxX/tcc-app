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
  locacaoStatusEnum = new Array();

  locacoes: Locacao[] = new Array();
loading = false;


  constructor(private locacaoService: LocacaoService,
              private confirmationService: ConfirmationService,
              protected messageService: MessageService) { }



  ngOnInit() {
    this.loading = true;
    this.filters.set('professor', { filtro: '', type: 'input' });
    this.filters.set('datashow', { filtro: '', type: 'input' });
    this.filters.set('status', { filtro: '', type: 'input' });
    this.getLocacoes(this.page, this.count);
    this.locacaoStatusEnum = [
      { label: 'Concluída', value: 'CONCLUIDA' },
      { label: 'Em Andamento', value: 'ANDAMENTO' }
    ];

  }


  loadLazy(event) {
    this.pageIndex = event.first / event.rows;
    this.getLocacoes(this.pageIndex, this.count);
  }

  pesquisar() {
    // NO CASO DE LIMPAR A SELEÇÃO
    if (
      this.filters.get('status').filtro == null ||
      this.filters.get('status').filtro === ''
    ) {
      this.load(0, this.filters.get('professor').filtro, this.filters.get('datashow').filtro, '');
    } else {
      this.load(
        0,
        this.filters.get('professor').filtro,
        this.filters.get('datashow').filtro,
        this.filters.get('status').filtro.value
      );
    }
  }

  load(page, professor, datashow, status) {
    this.locacaoService
      .getByParameters(page, this.count, professor, datashow, status)
      .subscribe(
        pages => {
          this.locacoes = pages.content;
          this.totalRecords = pages.totalElements;
        },
        err => console.error(err)
      );
  }

  getLocacoes(page: number, count: number) {
    this.locacaoService
      .findAll(page, count)
      .subscribe(
        pages => {
          pages = pages;
          this.locacoes = pages.content;
          this.totalRecords = pages.totalElements;
          this.loading = false;
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      );
  }

  concluirLocacao(locacao) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja concluir a locação?',
      accept: () => {
        this.locacaoService.concluir(locacao).subscribe(() => {
          this.actionsForSuccess();
          this.load(0, '', '', '');
        },
          (err) => {
            this.actionsForError(err);
          });
      }
    });
  }

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
