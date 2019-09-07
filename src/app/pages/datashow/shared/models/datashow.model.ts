import { BaseResourceModel } from 'src/app/shared/models/base.resource.model';
export class Datashow extends BaseResourceModel {
  public identificacao: string;
  public numTombamento: string;
  public possuiHdmi: boolean;
  public possuiVga: boolean;
  public status: string;

  constructor() {
    super();
  }

  static fromJson(jsonData: any): Datashow {
    return Object.assign(new Datashow(), jsonData);
  }
}
