import { switchMap } from 'rxjs/operators';
import { DatashowService } from './../../datashow/shared/services/datashow.service';
import { Professor } from './../../professor/shared/models/professor.model';
import { ProfessorService } from './../../professor/shared/services/professor.service';
import { LocacaoService } from './../shared/services/locacao.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.components';
import { Component, OnInit, Injector, AfterContentChecked } from '@angular/core';
import { Locacao } from '../shared/models/locacao.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Datashow } from '../../datashow/shared/models/datashow.model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-locacoes-form',
  templateUrl: './locacoes-form.component.html',
  styleUrls: ['./locacoes-form.component.css']
})
export class LocacoesFormComponent extends BaseResourceFormComponent<Locacao>
  implements OnInit, AfterContentChecked {
  professores: Professor[] = new Array();
  datashows: Datashow[] = new Array();
  professorSelecionado: Professor = new Professor();
  datashowSelecionado: Datashow = new Datashow();
  cursos = new Array();
  datashowStatus = new Array();

  constructor(
    protected messageService: MessageService,
    protected injector: Injector,
    protected locacaoService: LocacaoService,
    private confirmationService: ConfirmationService,
    private professorService: ProfessorService,
    private datashowService: DatashowService
  ) {
    super(
      messageService,
      injector,
      new Locacao(),
      locacaoService,
      Locacao.fromJson
    );
  }

  ngAfterContentChecked() {

  }
  ngOnInit() {
    this.cursos = [
      { label: 'Engenharia de Computação', value: 'COMPUTACAO' },
      { label: 'Engenharia Civil', value: 'CIVIL' },
      { label: 'Engenharia Mecânica', value: 'MECANICA' },
      { label: 'Engenharia de Produção', value: 'PRODUCAO' },
      { label: 'Curso de Formação de Oficiais', value: 'CFO' },
    ];
    this.datashowStatus = [
      { label: 'Disponível', value: 'DISPONIVEL' },
      { label: 'Manutenção', value: 'MANUTENCAO' },
      { label: 'Emprestado', value: 'EMPRESTADO' },
    ];
    super.ngOnInit();
    if (this.currentAction === 'new') {
      this.getProfessoresElegiveis();
      this.getDatashowsDisponiveis();
    }

  }


  getDatashowsDisponiveis() {
    this.datashowService.getAllDisponiveis().subscribe((datashows) => {
      this.datashows = datashows;
    }, (err) => {

    });
  }

  getDatashows() {
    const tempList = new Array();
    this.datashowService.getAll().subscribe((datashows) => {
      datashows.forEach(datashow => {
        if (this.resource.datashow.id === datashow.id) {
          tempList.push(datashow);
        } else if (this.resource.datashow.id !== datashow.id && datashow.status !== 'EMPRESTADO') {
          tempList.push(datashow);
        }
        this.datashows = tempList;
      });
    }, (err) => {

    });
  }

  getProfessores() {
    this.professorService.getAll().subscribe(
      professores => {
        this.professores = professores;
      },

    );
  }

  getProfessoresElegiveis() {
    this.professorService.getAllElegiveis().subscribe(
      professores => {
        this.professores = professores;
      },

    );
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      professor: [{ value: null, disabled: this.currentAction === 'edit' }, Validators.required],
      datashow: [null, Validators.required],
      matricula: [{ value: null, disabled: true }],
      curso: [{ value: null, disabled: true }],
      numTombamento: [{ value: null, disabled: true }],
      hdmi: [{ value: null, disabled: true }],
      vga: [{ value: null, disabled: true }],
    });
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja salvar a locação?',
      accept: () => {
        this.submitForm();
      }
    });
  }

  setProfessor(event) {
    if (event.value != null) {
      this.cursos.forEach(item => {
        if (item.value === event.value.curso) {
          event.value.curso = item.label;
        }
      });
      this.professorSelecionado = event.value;
    } else {
      let labelCurso;
      this.cursos.forEach(item => {
        if (item.value === event.curso) {
          labelCurso = item.label;
        }
      });
      this.professorSelecionado.matricula = event.matricula;
      this.professorSelecionado.curso = labelCurso;
    }

  }

  setDatashow(event) {
    if (event.value != null) {
      this.datashowSelecionado = event.value;
    } else {
      this.datashowSelecionado = event;
    }
  }

  possuiEntrada(entrada) {
    if (entrada === 'hdmi') {
      if (this.datashowSelecionado.possuiHdmi != null) {
        if (this.datashowSelecionado.possuiHdmi) {
          return 'Sim';
        } else {
          return 'Não';
        }
      } else {
        return '';
      }
    } else {
      if (this.datashowSelecionado.possuiVga != null) {
        if (this.datashowSelecionado.possuiVga) {
          return 'Sim';
        } else {
          return 'Não';
        }
      } else {
        return '';
      }
    }

  }

  protected createResource() {

    const resource: Locacao = this.jsonDataToResourceFn(this.resourceForm.value);
    resource.professor.curso = null;
    this.resourceService.create(resource).subscribe(
      () => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );
  }

  protected updateResource() {
    const resource: Locacao = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.update(resource).subscribe(
      () => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );

  }

  protected loadResource() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get('id')))
      )
        .subscribe(
          (resource) => {
            this.resource = resource;
            this.setProfessor(resource.professor);
            this.setDatashow(resource.datashow);
            this.resourceForm.patchValue(resource);
            if (this.resource.status === 'CONCLUIDA') {
              this.resourceForm.controls.datashow.disable();
            }

            this.getProfessores();
            this.getDatashows();

          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro ao carregar os dados'
            });
            this.router.navigateByUrl('/locacoes');
          }
        );
    }
  }
}
