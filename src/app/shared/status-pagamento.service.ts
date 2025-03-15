import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IPaginator } from '../interface/IPaginator';
import { IFornecedor } from '../interface/IFornecedor';
import { IAtendente } from '../interface/IAtendente';

@Injectable({
  providedIn: 'root',
})
export class StatusPagamentoService {

  constructor(
    public httpClient: HttpClient
  ) {
  }

  getAllStatusPagamentoSelect({ onSuccess, onError }: any): any {
    let url = environment.apiUrl + `StatusPagamento`;

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
