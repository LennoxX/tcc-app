import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config.service';
import { LoginRequest } from '../models/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private configService: ConfigService, private http: HttpClient) { }

  authenticate(loginRequest: LoginRequest) {
    return this.http.post(`${this.configService.getAuthUrl()}signin`, loginRequest);
  }
}
