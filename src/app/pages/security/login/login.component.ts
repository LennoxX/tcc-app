import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  exibir = true;
  constructor(private router: Router) {
    this.exibir = true;
  }

  ngOnInit() {
    this.exibir = true;
  }

  teste() {
    console.log('clicou');
    localStorage.setItem('token', '123');
    this.router.navigateByUrl('datashow');
  }

  hasToken() {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }

}
