import { BaseResourceModel } from 'src/app/shared/models/base.resource.model';

export class Professor extends BaseResourceModel {
  public matricula: string;
  public curso: string;
  public nome: string;
  constructor() {
    super();
  }

  static fromJson(jsonData: any): Professor {
    return Object.assign(new Professor(), jsonData);
  }
}
