import { UserService } from './../../../core/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../shared/models/login-request.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  builder: FormBuilder = new FormBuilder();
  loginRequest: LoginRequest = new LoginRequest();
  boolean = true;
  loading = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.builder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, Validators.required]
    });
  }

  login() {
    this.loading = true;
    this.loginRequest = Object.assign(new LoginRequest(), this.loginForm.value);
    this.authService.authenticate(this.loginRequest).subscribe(
      (response: any) => {
        sessionStorage.setItem('token', response.accessToken);
        this.loading = false;
        this.userService.setUsuarioLogado(response.usuario);
        this.router.navigateByUrl('home');
      },
      err => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Falha no Login',
          detail: err.error.errors != null ? err.error.errors[0] : 'Falha na conexão com o servidor'
        });
      }
    );
  }
}
