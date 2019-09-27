import { MessageService } from 'primeng/components/common/messageservice';
import { Datashow } from './../shared/models/datashow.model';
import { DatashowService } from './../shared/services/datashow.service';
import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/shared/models/page';
import { Professor } from '../../professor/shared/models/professor.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-datashow-list',
  templateUrl: './datashow-list.component.html',
  styleUrls: ['./datashow-list.component.css']
})
export class DatashowListComponent implements OnInit {


  page = 0;
  count = 10;
  totalRecords: number;
  pageIndex: number;
  pages: Page<Datashow> = new Page<Datashow>();
  filters = new Map();
  datashowStatus = new Array();
  possuiEntradas = new Array();

  datashows: Datashow[] = new Array();



  constructor(private datashowService: DatashowService,
              private confirmationService: ConfirmationService,
              protected messageService: MessageService) { }



  ngOnInit() {
    this.getProfessores(this.page, this.count);
    this.filters.set('identificacao', { filtro: '', type: 'input' });
    this.filters.set('numTombamento', { filtro: '', type: 'input' });
    this.filters.set('possuiHdmi', { filtro: '', type: 'input' });
    this.filters.set('possuiVga', { filtro: '', type: 'input' });
    this.filters.set('status', { filtro: '', type: 'input' });
    this.datashowStatus = [
      { label: 'Disponível', value: 'DISPONIVEL' },
      { label: 'Emprestado', value: 'EMPRESTADO' },
      { label: 'Manutenção', value: 'MANUTENCAO' },
    ];
  }


  loadLazy(event) {
    this.pageIndex = event.first / event.rows;
    this.getProfessores(this.pageIndex, this.count);
  }


  getProfessores(page: number, count: number) {
    this.datashowService
      .findAll(page, count)
      .subscribe(
        pages => {
          pages = pages;
          this.datashows = pages.content;
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
  }

  load(page, identificacao, numTombamento, status) {
    this.datashowService
      .getByParameters(page, this.count, identificacao, numTombamento, status)
      .subscribe(
        pages => {
          this.datashows = pages.content;
          this.totalRecords = pages.totalElements;
        },
        err => console.error(err)
      );
  }

  exibirStatus(curso) {
    return this.datashowStatus.filter(item => {
      return item.value === curso;
    })[0].label;
  }

  setManutencao(datashow: Datashow) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja executar esta ação? ',
      accept: () => {
        datashow.status = 'MANUTENCAO';
        this.datashowService.update(datashow).subscribe((res) => {
          this.actionsForSuccess();
        }, (err) => {
          this.actionsForError(err);
        });
      }
    });
  }

  setDisponivel(datashow: Datashow) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja executar esta ação? ',
      accept: () => {
        datashow.status = 'DISPONIVEL';
        this.datashowService.update(datashow).subscribe((res) => {
          this.actionsForSuccess();
        }, (err) => {
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
