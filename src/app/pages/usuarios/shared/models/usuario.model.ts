import { BaseResourceModel } from 'src/app/shared/models/base.resource.model';

export class Usuario extends BaseResourceModel {
  constructor(
    public nome?: string,
    public email?: string,
    public username?: string,
    public password?: string,
    public ativo?: boolean,
    public nivel?: string,
    public curso?: string,
  ) {
    super();
  }

  static fromJson(jsonData: any): Usuario {
    return Object.assign(new Usuario(), jsonData);
  }
}
