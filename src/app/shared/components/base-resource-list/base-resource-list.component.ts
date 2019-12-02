import { OnInit, Injector } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { BaseResourceModel } from '../../models/base.resource.model';
import { BaseResourceService } from '../../services/base.resource.service';
import { Page } from '../../models/page';

export abstract class BaseResourceListComponent<T extends BaseResourceModel>
  implements OnInit {
  page = 0;
  count = 10;
  totalRecords: number;
  pageIndex: number;
  pages: Page<T> = new Page<T>();
  filters = new Map();
  resources: T[] = new Array();
  messageService: any;
  constructor(protected resourceService: BaseResourceService<T>, protected injector: Injector) {
    this.messageService = this.injector.get(MessageService);
  }

  ngOnInit() {
    this.getResources();
  }

  protected getResources() {
    this.resourceService.findAll(this.page, this.count).subscribe(
      pages => {
        this.resources = pages.content;
        this.totalRecords = pages.totalElements;
      },
      error => {
        this.actionsForError(error);
      }
    );
  }

  protected loadResourcesLazy(pageIndex: number) {
    this.resourceService.findAll(pageIndex, this.count).subscribe(
      pages => {
        this.resources = pages.content;
        this.totalRecords = pages.totalElements;
      },
      error => {
        this.actionsForError(error);
      }
    );
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
      detail: error.error.errors != null ? error.error.errors[0] : 'Falha na conexão com o servidor'
    });
  }
}
