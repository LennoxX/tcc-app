import { Component, Injector, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Page } from 'src/app/shared/models/page';
import { Datashow } from './../shared/models/datashow.model';
import { DatashowService } from './../shared/services/datashow.service';

@Component({
  selector: 'app-datashow-list',
  templateUrl: './datashow-list.component.html',
  styleUrls: ['./datashow-list.component.css']
})
export class DatashowListComponent extends BaseResourceListComponent<Datashow> implements OnInit {
  pages: Page<Datashow> = new Page<Datashow>();
  datashowStatus = new Array();
  possuiEntradas = new Array();

  constructor(private datashowService: DatashowService, private confirmationService: ConfirmationService, protected injector: Injector) {
    super(datashowService, injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.filters.set('identificacao', { filtro: '', type: 'input' });
    this.filters.set('numTombamento', { filtro: '', type: 'input' });
    this.filters.set('possuiHdmi', { filtro: '', type: 'input' });
    this.filters.set('possuiVga', { filtro: '', type: 'input' });
    this.filters.set('status', { filtro: '', type: 'input' });
    this.datashowStatus = [
      { label: 'Disponível', value: 'DISPONIVEL' },
      { label: 'Emprestado', value: 'EMPRESTADO' },
      { label: 'Manutenção', value: 'MANUTENCAO' }
    ];
  }

  loadLazy(event) {
    this.pageIndex = event.first / event.rows;
    this.loadResourcesLazy(this.pageIndex);
  }

  pesquisar() {
    if (this.filters.get('status').filtro == null || this.filters.get('status').filtro === '') {
      this.load(0, this.filters.get('identificacao').filtro, this.filters.get('numTombamento').filtro, '');
    } else {
      this.load(0, this.filters.get('identificacao').filtro, this.filters.get('numTombamento').filtro, this.filters.get('status').filtro.value);
    }
  }

  load(page, identificacao, numTombamento, status) {
    this.datashowService
      .getByParameters(page, this.count, identificacao, numTombamento, status)
      .subscribe(pages => {
        this.resources = pages.content;
        this.totalRecords = pages.totalElements;
      });
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
        this.datashowService.update(datashow).subscribe(
          res => {
            this.actionsForSuccess();
          },
          err => {
            this.actionsForError(err);
          }
        );
      }
    });
  }

  setDisponivel(datashow: Datashow) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja executar esta ação? ',
      accept: () => {
        datashow.status = 'DISPONIVEL';
        this.datashowService.update(datashow).subscribe(
          res => {
            this.actionsForSuccess();
          },
          err => {
            this.actionsForError(err);
          }
        );
      }
    });
  }
}
