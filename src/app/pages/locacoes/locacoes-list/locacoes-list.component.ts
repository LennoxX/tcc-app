import { Component, Injector, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { LocacaoService } from '../shared/services/locacao.service';
import { Locacao } from './../shared/models/locacao.model';

@Component({
  selector: 'app-locacoes-list',
  templateUrl: './locacoes-list.component.html',
  styleUrls: ['./locacoes-list.component.css']
})
export class LocacoesListComponent extends BaseResourceListComponent<Locacao>
  implements OnInit {
  locacaoStatusEnum = new Array();
  loading = false;

  constructor(
    private locacaoService: LocacaoService, private confirmationService: ConfirmationService, protected injector: Injector) {
    super(locacaoService, injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.loading = true;
    this.filters.set('professor', { filtro: '', type: 'input' });
    this.filters.set('datashow', { filtro: '', type: 'input' });
    this.filters.set('status', { filtro: '', type: 'input' });
    this.locacaoStatusEnum = [
      { label: 'Concluída', value: 'CONCLUIDA' },
      { label: 'Em Andamento', value: 'ANDAMENTO' }
    ];
  }

  loadLazy(event) {
    this.pageIndex = event.first / event.rows;
    this.loadResourcesLazy(this.pageIndex);
  }

  pesquisar() {
    if (this.filters.get('status').filtro == null || this.filters.get('status').filtro === '') {
      this.load(0, this.filters.get('professor').filtro, this.filters.get('datashow').filtro, '');
    } else {
      this.load(0, this.filters.get('professor').filtro, this.filters.get('datashow').filtro, this.filters.get('status').filtro.value);
    }
  }

  load(page, professor, datashow, status) {
    this.locacaoService
      .getByParameters(page, this.count, professor, datashow, status)
      .subscribe(pages => {
        this.resources = pages.content;
        this.totalRecords = pages.totalElements;
      });
  }

  concluirLocacao(locacao) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja concluir a locação?',
      accept: () => {
        this.locacaoService.concluir(locacao).subscribe(
          () => {
            this.actionsForSuccess();
            this.loadResourcesLazy(this.pageIndex);
          },
          err => {
            this.actionsForError(err);
          }
        );
      }
    });
  }

}
