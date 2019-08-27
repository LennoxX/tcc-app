import { BaseResourceModel } from 'src/app/shared/models/base.resource.model';

export class Usuario extends BaseResourceModel {
  constructor(
    public nome?: string,
    public email?: string,
    public username?: string,
    public password?: string,
    public ativo?: boolean,
    public habilitado?: boolean,
    public expirado?: boolean,
    public bloqueado?: boolean,
    public niveis?: string[],
  ) {
    super();
    this.niveis = new Array();
  }
}
