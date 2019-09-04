import { Curso } from './../shared/models/curso.model';
import { Component, OnInit, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.components';
import { Professor } from '../shared/models/professor.model';
import { ProfessorService } from '../shared/services/professor.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Validators } from '@angular/forms';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.css']
})
export class ProfessorFormComponent extends BaseResourceFormComponent<Professor> implements OnInit {

  cursos: any[] = new Array();

  constructor(protected messageService: MessageService, protected injector: Injector, protected professorService: ProfessorService) {
    super(messageService, injector, new Professor(), professorService, Professor.fromJson);
  }

  ngOnInit() {
    super.ngOnInit();
    this.cursos = [
      { label: 'Engenharia de Computação', value: 'COMPUTACAO' },
      { label: 'Engenharia Civil', value: 'CIVIL' },
      { label: 'Engenharia Mecânica', value: 'MECANICA' },
      { label: 'Engenharia de Produção', value: 'PRODUCAO' },
      { label: 'Curso de Formação de Oficiais', value: 'CFO' },
    ];
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      matricula: [null, Validators.required],
      curso: [null, Validators.required]
    });
  }

  submitForm() {
    this.submittingForm = true;

    this.resourceForm.get('curso').setValue(this.resourceForm.get('curso').value.value);

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
            this.cursos.forEach(item => {
              if (item.value === resource.curso) {
                this.resource.curso = item;
              }
            });
            this.resourceForm.patchValue(this.resource);

          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro ao carregar os dados',
              detail: error
            })
          }
        );
    }
  }




}
