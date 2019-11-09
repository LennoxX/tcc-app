import { Locacao } from './../../locacoes/shared/models/locacao.model';
import { Component, OnInit } from '@angular/core';
import { LocacaoService } from '../../locacoes/shared/services/locacao.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {
  rangeDates: any;
  loading = false;
  locacoes: Locacao[] = new Array();

  constructor(private locacaoService: LocacaoService, private datePipe: DatePipe) {

  }

  ngOnInit() {
  }

  teste() {
    if (this.rangeDates[1] != null) {
      this.loading = true;
      const tempInicio = new Date(this.rangeDates[0]);
      const tempFim = new Date(this.rangeDates[1]);
      const dataInicio = this.datePipe.transform(tempInicio, 'yyyy-MM-dd');
      const dataFim = this.datePipe.transform(tempFim, 'yyyy-MM-dd');
      this.locacaoService.getRelatorio(dataInicio, dataFim).subscribe(res => {
        this.locacoes = res;
        this.loading = false;
      },
        err => {
          console.log(err);
        });
    }

  }

  getNomeCurso(curso) {
    if (curso === 'COMPUTACAO') {
      return 'Computação';
    } else if (curso === 'CFO') {
      return 'CFO';
    } else if (curso === 'MECANICA') {
      return 'Mecânica';
    } else if (curso === 'CIVIL') {
      return 'Civil';
    } else {
      return 'Produção';
    }
  }
}
