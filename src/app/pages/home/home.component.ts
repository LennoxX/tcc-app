import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocacaoService } from '../locacoes/shared/services/locacao.service';
import { Locacao } from '../locacoes/shared/models/locacao.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  locacoes: Locacao[] = new Array();
  constructor(
    private locacaoService: LocacaoService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.locacaoService.getAllEmAndamento().subscribe(
      locacoes => this.locacoes = locacoes,
      err => console.log(err)
    )
  }

}
