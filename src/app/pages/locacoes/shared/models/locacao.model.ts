import { BaseResourceModel } from 'src/app/shared/models/base.resource.model';

export class Locacao extends BaseResourceModel {
  public matricula: string;
  public curso: string;
  public nome: string;
  constructor() {
    super();
  }

  static fromJson(jsonData: any): Locacao {
    return Object.assign(new Locacao(), jsonData);
  }
}
