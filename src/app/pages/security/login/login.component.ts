import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../shared/models/login-request.model';
import { Response } from 'src/app/shared/models/response.model';
import { Usuario } from '../../usuarios/shared/usuario.model';

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
  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.builder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, Validators.required]
    });
  }

  teste() {
    this.loginRequest = Object.assign(new LoginRequest(), this.loginForm.value);
    this.authService.authenticate(this.loginRequest).subscribe((response: any) => {
      sessionStorage.setItem('token', response.accessToken);
      this.router.navigateByUrl('home');
    },
    (err) => console.log(err));
  }

  hasToken() {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }

}
