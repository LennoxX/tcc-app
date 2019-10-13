export class ConfigService {
  constructor() {}

  getAppUrl(): string {
    return '';
  }

  getApiUrl(): string {
    //    return 'http://192.168.0.25:8080/locacao/api/';
    return "http://192.168.0.40:8080/locacao/api/";
  }

  getAuthUrl(): string {
    // return 'http://192.168.0.25:8080/locacao/auth/';
    return "http://192.168.0.40:8080/locacao/auth/";
  }
}
