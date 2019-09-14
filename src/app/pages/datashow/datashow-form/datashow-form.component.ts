import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.components';
import { Datashow } from '../shared/models/datashow.model';
import { DatashowService } from './../shared/services/datashow.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-datashow-form',
  templateUrl: './datashow-form.component.html',
  styleUrls: ['./datashow-form.component.css']
})
export class DatashowFormComponent extends BaseResourceFormComponent<Datashow> implements OnInit {

  datashowStatus = new Array();

  constructor(protected messageService: MessageService,
              protected injector: Injector,
              protected datashowService: DatashowService,
              private confirmationService: ConfirmationService) {
    super(messageService, injector, new Datashow(), datashowService, Datashow.fromJson);
  }

  ngOnInit() {
    super.ngOnInit();
    this.fillStatus();
  }

  fillStatus() {

    if (this.currentAction === 'edit') {
      this.datashowStatus = new Array();
      this.datashowStatus = [
        { label: 'Disponível', value: 'DISPONIVEL' },
        { label: 'Manutenção', value: 'MANUTENCAO' },
        { label: 'Emprestado', value: 'EMPRESTADO' },
      ];
    } else {
      this.datashowStatus = new Array();
      this.datashowStatus = [
        { label: 'Disponível', value: 'DISPONIVEL' },
        { label: 'Manutenção', value: 'MANUTENCAO' },
      ];
    }

  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      identificacao: [null, Validators.required],
      numTombamento: [null, Validators.required],
      possuiVga: [null, Validators.required],
      possuiHdmi: [null, Validators.required],
      status: [null, Validators.required]
    });
  }


  confirm() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja salvar o datashow',
      accept: () => {
        this.submitForm();
      }
    });
  }


  submitForm() {
    this.submittingForm = true;
    this.resourceForm.get('status').setValue(this.resourceForm.get('status').value.value);
    if (this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  protected loadResource() {

    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get('id')))
      )
        .subscribe(
          (resource) => {
            this.resource = resource;
            this.datashowStatus.forEach(item => {
              if (item.value === resource.status) {
                this.resource.status = item;
              }
            });
            this.resourceForm.patchValue(this.resource);
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro ao carregar os dados',
              detail: error
            });
          }
        );
    }
  }
}
