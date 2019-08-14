import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseResourceModel } from '../models/base.resource.model';
import { Response } from '../models/response.model';
import { ConfigService } from './config.service';
import { Page } from '../models/page';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;
  protected configService: ConfigService = new ConfigService();
  protected router: Router;

  constructor(protected apiPath: string, protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResources)
    );
  }

  findAll(page: number, count: number): Observable<Page<T>> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}/${page}/${count}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataPagesToResources)
    );
  }

  getById(id: number): Observable<T> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    );
  }

  create(resource: T): Observable<T> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}`;
    return this.http.post(url, resource).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    );
  }

  update(resource: T): Observable<T> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}/${resource.id}`;
    return this.http.put(url, resource).pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // Metodos Protegidos

  protected jsonDataToResources(jsonData: Response<T[]>): T[] {
    const resources: T[] = [];
    jsonData.data.forEach(element => resources.push(element as T));
    return resources;
  }

  protected jsonDataToResource(jsonData: Response<T>): T {
    return jsonData.data as T;
  }

  protected jsonDataPagesToResources(jsonData: Response<Page<T>>): Page<T> {
    const resources = Object.assign(new Response(), jsonData.data);
    return resources;
  }

  protected handleError(error: Response<T[]>): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    // ERROR UNAUTHORIZED
    if (error.status === '401') {
      // REDIRECIONA PARA A TELA DE LOGIN
     window.location.replace('/auth/login');
    }
    return throwError(error);
  }

}
