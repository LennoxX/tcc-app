import { BaseResourceModel } from 'src/app/shared/models/base.resource.model';

export class Usuario extends BaseResourceModel {
  constructor(
    public nome?: string,
    public email?: string,
    public username?: string,
    public password?: string,
    public ativo?: boolean,
    public niveis?: string[],
  ) {
    super();
    this.niveis = new Array();
  }

  static fromJson(jsonData: any): Usuario {
    return Object.assign(new Usuario(), jsonData);
  }
}
