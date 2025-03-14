import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPaginator } from '../interface/IPaginator';
import { IFornecedor } from '../interface/IFornecedor';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {

  constructor(
    public httpClient: HttpClient
  ) {
  }


  cadastrarFornecedor(fornecedor: IFornecedor, { onSuccess, onError }: any): any {
    this.httpClient
      .post(environment.apiUrl + `Fornecedor`, fornecedor, {
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
  editarFornecedor(fornecedor: IFornecedor, { onSuccess, onError }: any): any {
    this.httpClient
      .put(environment.apiUrl + `Fornecedor`, fornecedor, {
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
  getAllFornecedor(pagination: IPaginator, { onSuccess, onError }: any): any {
    let url = environment.apiUrl + `Fornecedor?PageNumber=` + (pagination.pageNumber) + `&PageSize=` + (pagination.pageSize || "10");

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
  getAllFornecedorSelect({ onSuccess, onError }: any): any {
    let url = environment.apiUrl + `Fornecedor/Select`;

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
