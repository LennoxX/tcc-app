import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.components';
import { Component, OnInit, Injector } from '@angular/core';
import { Usuario } from '../shared/models/usuario.model';
import { UsuarioService } from '../shared/services/usuario.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Validators, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent extends BaseResourceFormComponent<Usuario> implements OnInit {
  usuarioLogado: Usuario;
  updatePass: FormGroup;

  constructor(protected messageService: MessageService,
              protected injector: Injector,
              protected usuarioService: UsuarioService,
              private userService: UserService,
              private confirmationService: ConfirmationService) {
    super(messageService, injector, new Usuario(), usuarioService, Usuario.fromJson);

  }

  ngOnInit() {
    super.ngOnInit();
    if (this.currentAction === 'edit') {
      this.resourceForm.controls.password.setValidators([]);
      this.resourceForm.controls.confirmPassword.setValidators([]);
    }
    this.usuarioLogado = this.userService.getInstance();
    this.buildUpdatePassForm();
  }

  protected buildUpdatePassForm() {
    this.updatePass = this.formBuilder.group({
      id: [null],
      password: [null, [Validators.required, Validators.minLength(5)]],
      novaSenha: [null, [Validators.required, Validators.minLength(5)]],
      confirmNovaSenha: [null, [Validators.required, Validators.minLength(5)]],
    });
  }
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      confirmPassword: [null, Validators.required],
      ativo: [null],
      nivel: [null, Validators.required]
    });
  }

  protected loadResource() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get('id')))
      )
        .subscribe(
          (resource) => {
            this.resource = resource;
            this.resource.password = '';

            this.resourceForm.patchValue(this.resource);

            this.updatePass.patchValue(this.resource);
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


  checkPassword(form: FormGroup, senha: string, confirmSenha: string) {
    const varSenha = form.controls[senha].value;
    const varConfirmSenha = form.controls[confirmSenha].value;
    if (varSenha !== varConfirmSenha) {
      form.controls[confirmSenha].setErrors({ invalid: true });
      return true;
    } else {
      form.controls[confirmSenha].valid;
      return false;
    }

  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja salvar o Usuário?',
      accept: () => {
        this.submitForm();
      }
    });
  }

  confirmAlterarSenha() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja alterar a senha?',
      accept: () => {
        this.submitAlterarSenhaForm();
      }
    });
  }


  submitAlterarSenhaForm() {
    const resource: Usuario = this.jsonDataToResourceFn(this.updatePass.value);

    this.usuarioService.updatePassword(resource, this.updatePass.controls['novaSenha'].value).subscribe(
      () => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );

  }

  protected actionsForSuccess(resource: Usuario) {
    this.router.navigateByUrl('/home').then(
      () => this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Solicitação Processada com Sucesso!'
      }));
  }

  protected actionsForError(error) {

    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.router.navigateByUrl('/home').then(
        () => this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: error.error.errors[0]
        }));
    }
  }

  protected createResource() {

    const resource: Usuario = this.jsonDataToResourceFn(this.resourceForm.value);
    resource.nivel = this.resourceForm.controls.nivel.value;


    this.resourceService.create(resource).subscribe(
      () => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );
  }

  protected updateResource() {
    const resource: Usuario = this.jsonDataToResourceFn(this.resourceForm.value);
    resource.nivel = this.resourceForm.controls.nivel.value;
    this.resourceService.update(resource).subscribe(
      () => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );

  }

  exibirInfoAdmin() {
    if (this.userService.getInstance() != null) {
      return this.userService.getInstance().nivel.indexOf('ADMIN') !== -1;
    }

  }
}
