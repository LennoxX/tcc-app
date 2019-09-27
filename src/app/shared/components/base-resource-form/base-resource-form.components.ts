import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { switchMap } from 'rxjs/operators';

import { BaseResourceModel } from '../../models/base.resource.model';
import { BaseResourceService } from '../../services/base.resource.service';
import { MessageService } from 'primeng/components/common/messageservice';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected messageService: MessageService,
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T,
  ) {

    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);

  }

  ngOnInit() {
    this.setCurrentAction();
    this.loadResource();
    this.buildResourceForm();

  }

  ngAfterContentChecked() {
    this.setPageTitle();

  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }

  }

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
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
            this.resourceForm.patchValue(resource);
          },
          (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
        );
    }
  }

  protected setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }
  protected creationPageTitle(): string {
    return 'Novo';
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }


  protected createResource() {

    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.create(resource).subscribe(
      () => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.update(resource).subscribe(
      () => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );

  }

  protected actionsForSuccess(resource: T) {
    const baseComponentPath: string = this.route.parent.snapshot.url[0].path;
    this.router.navigateByUrl(baseComponentPath).then(
      () => this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Solicitação Processada com Sucesso!'
      }));
  }


  protected actionsForError(error) {

    const baseComponentPath: string = this.route.parent.snapshot.url[0].path;
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.router.navigateByUrl(baseComponentPath).then(
        () => this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: error
        }));
    }
  }

  protected abstract buildResourceForm(): void;


}
