export class ConfigService {
  constructor() {}

  getAppUrl(): string {
    return "";
  }

  getApiUrl(): string {
    //    return 'http://192.168.0.25:8080/aplicacao/api/';
    return "http://localhost:8080/api/";
  }

  getAuthUrl(): string {
    // return 'http://192.168.0.25:8080/aplicacao/auth/';
    return "http://localhost:8080/auth/";
  }
}
