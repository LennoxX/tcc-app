import { Datashow } from "./../../../datashow/shared/models/datashow.model";
import { Professor } from "./../../../professor/shared/models/professor.model";
import { BaseResourceModel } from "src/app/shared/models/base.resource.model";

export class Locacao extends BaseResourceModel {
  public professor: Professor;
  public datashow: Datashow;
  public dataFim: Date;
  public dataInicio: Date;
  constructor() {
    super();
  }

  static fromJson(jsonData: any): Locacao {
    return Object.assign(new Locacao(), jsonData);
  }
}
