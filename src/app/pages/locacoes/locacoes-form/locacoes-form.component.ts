import { Professor } from "./../../professor/shared/models/professor.model";
import { ProfessorService } from "./../../professor/shared/services/professor.service";
import { LocacaoService } from "./../shared/services/locacao.service";
import { BaseResourceFormComponent } from "src/app/shared/components/base-resource-form/base-resource-form.components";
import { Component, OnInit, Injector } from "@angular/core";
import { Locacao } from "../shared/models/locacao.model";
import { MessageService, ConfirmationService } from "primeng/api";
import { DatashowService } from "../../datashow/shared/services/datashow.service";
import { Datashow } from "../../datashow/shared/models/datashow.model";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-locacoes-form",
  templateUrl: "./locacoes-form.component.html",
  styleUrls: ["./locacoes-form.component.css"]
})
export class LocacoesFormComponent extends BaseResourceFormComponent<Locacao>
  implements OnInit {
  professores: Professor[] = new Array();

  constructor(
    protected messageService: MessageService,
    protected injector: Injector,
    protected locacaoService: LocacaoService,
    private confirmationService: ConfirmationService,
    private professorService: ProfessorService
  ) {
    super(
      messageService,
      injector,
      new Locacao(),
      locacaoService,
      Locacao.fromJson
    );
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.currentAction == "new") {
      this.getProfessoresElegiveis();
    } else {
      this.getProfessores();
    }
  }

  getProfessores() {
    this.professorService.getAll().subscribe(
      professores => {
        this.professores = professores;
      },
      err => console.log(err)
    );
  }

  getProfessoresElegiveis() {
    this.professorService.getAllElegiveis().subscribe(
      professores => {
        this.professores = professores;
      },
      err => console.log(err)
    );
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      professor: [null, Validators.required]
    });
  }
}
