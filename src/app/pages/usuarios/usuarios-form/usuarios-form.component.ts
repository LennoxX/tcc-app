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
  niveis = new Array();
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
    this.updatePass = this.formBuilder.group({
      senhaAtual: [null, [Validators.required, Validators.minLength(5)]],
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
      niveis: [null, Validators.required]
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
      form.controls[confirmSenha].setErrors({ invalid: false });
      return false;
    }
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja salvar o Usuário',
      accept: () => {
        this.submitForm();
      }
    });
  }

  protected createResource() {

    const resource: Usuario = this.jsonDataToResourceFn(this.resourceForm.value);
    resource.niveis = new Array();
    resource.niveis.push(this.resourceForm.controls.niveis.value);
    

    this.resourceService.create(resource).subscribe(
      () => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );
  }

  protected updateResource() {
    const resource: Usuario = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.update(resource).subscribe(
      () => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );

  }

  exibirInfoAdmin() {
    if (this.userService.getInstance() != null) {
      return this.userService.getInstance().niveis.indexOf('ADMIN') !== -1;
    }

  }
}
