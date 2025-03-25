import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPaginator } from '../interface/IPaginator';

@Injectable({
  providedIn: 'root',
})
export class GerenteService {

  constructor(
    private router: Router,
    public httpClient: HttpClient
  ) {
  }


  cadastrarGerente(gerente: any, { onSuccess, onError }: any): any {
    this.httpClient
      .post(environment.apiUrl + `Gerente`, gerente, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          type: 'application/json',
          Authorization: "Bearer " + localStorage.getItem('token'),
        },
      })
      .subscribe({
        next: (res: any) => {
          return onSuccess(res);
        },
        error: (error: any) => {
          return onError(error);
        },
      });
  }
  editarGerente(gerente: any, { onSuccess, onError }: any): any {
    this.httpClient
      .put(environment.apiUrl + `Gerente`, gerente, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          type: 'application/json',
          Authorization: "Bearer " + localStorage.getItem('token'),
        },
      })
      .subscribe({
        next: (res: any) => {
          return onSuccess(res);
        },
        error: (error: any) => {
          return onError(error);
        },
      });
  }
  getAllGerente(pagination: IPaginator, { onSuccess, onError }: any): any {
    let url = environment.apiUrl + `Gerente?PageNumber=` + (pagination.pageNumber) + `&PageSize=` + (pagination.pageSize || "10");

    this.httpClient
      .get(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          type: 'application/json',
          Authorization: "Bearer " + localStorage.getItem('token'),
        },
      })
      .subscribe({
        next: (res: any) => {
          return onSuccess(res);
        },
        error: (error: any) => {
          return onError(error);
        },
      });
  }
  getAllGerenteSelect({ onSuccess, onError }: any): any {
    let url = environment.apiUrl + `Gerente/Select`;

    this.httpClient
      .get(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          type: 'application/json',
          Authorization: "Bearer " + localStorage.getItem('token'),
        },
      })
      .subscribe({
        next: (res: any) => {
          return onSuccess(res);
        },
        error: (error: any) => {
          return onError(error);
        },
      });
  }

  deletarGerente(idGerente: number, { onSuccess, onError }: any): any {
    this.httpClient
      .delete(environment.apiUrl + `Gerente?idGerente=${idGerente}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          type: 'application/json',
          Authorization: "Bearer " + localStorage.getItem('token'),
        },
      })
      .subscribe({
        next: (res: any) => {
          return onSuccess(res);
        },
        error: (error: any) => {
          return onError(error);
        },
      });
  }
}
