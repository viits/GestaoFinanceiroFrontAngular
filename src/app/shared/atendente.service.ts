import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IPaginator } from '../interface/IPaginator';
import { IFornecedor } from '../interface/IFornecedor';
import { IAtendente } from '../interface/IAtendente';

@Injectable({
  providedIn: 'root',
})
export class AtendenteService {

  constructor(
    public httpClient: HttpClient
  ) {
  }


  cadastrarAtendente(atendente: IAtendente, { onSuccess, onError }: any): any {
    this.httpClient
      .post(environment.apiUrl + `Atendente`, atendente, {
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
  editarAtendente(atendente: IAtendente, { onSuccess, onError }: any): any {
    this.httpClient
      .put(environment.apiUrl + `Atendente`, atendente, {
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
  getAllAtendente(pagination: IPaginator, { onSuccess, onError }: any): any {
    let url = environment.apiUrl + `Atendente?PageNumber=` + (pagination.pageNumber) + `&PageSize=` + (pagination.pageSize || "10");

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
  getAllAtendenteSelect({ onSuccess, onError }: any): any {
    let url = environment.apiUrl + `Atendente/Select`;

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
}
