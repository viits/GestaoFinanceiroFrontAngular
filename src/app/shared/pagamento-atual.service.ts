import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IPaginator } from '../interface/IPaginator';
import { IFornecedor } from '../interface/IFornecedor';
import { IAtendente } from '../interface/IAtendente';
import { IPagamento } from '../interface/IPagamento';

@Injectable({
  providedIn: 'root',
})
export class PagamentoAtualService {

  constructor(
    public httpClient: HttpClient
  ) {
  }

  getAllPagamentoAtual({ onSuccess, onError }: any): any {
    let url = environment.apiUrl + `FornecedorAtendente`;

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

  getAllPagamentoRelatorio(pagination: IPaginator, { onSuccess, onError }: any): any {
    let url = environment.apiUrl + `RelatorioPagamento?PageNumber=` + (pagination.pageNumber) + `&PageSize=` + (pagination.pageSize || "10");

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
  getBalancete(data: any, { onSuccess, onError }: any): any {
    let url = environment.apiUrl + `GerarBalancete?dataInicio=${data.dataInicio}&dataFim=${data.dataFim}`;
    if(data.idAtendente != 0 && data.idAtendente != undefined){
      url+= `&idAtendente=${data.idAtendente}`
    }
    if(data.idFornecedor != 0 && data.idFornecedor != undefined){
      url+= `&idFornecedor=${data.idFornecedor}`
    }
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

  getHistoricoBalancete(idFornecedorAtendente: number, { onSuccess, onError }: any): any {
    let url = environment.apiUrl + `HistoricoBalancete?idFornecedorAtendente=${idFornecedorAtendente}`;

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

  getAllMetodoPagamentoSelect({ onSuccess, onError }: any): any {
    let url = environment.apiUrl + `MetodoPagamento`;

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
  cadastrarPagamento(pagamento: IPagamento, { onSuccess, onError }: any): any {
    this.httpClient
      .post(environment.apiUrl + `FornecedorAtendente`, pagamento, {
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
  cadastrarPagamentoRelatorio(pagamento: IPagamento, { onSuccess, onError }: any): any {
    this.httpClient
      .post(environment.apiUrl + `RelatorioPagamento`, pagamento, {
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
  atualizarPagamentoRelatorio(pagamento: IPagamento, { onSuccess, onError }: any): any {
    this.httpClient
      .put(environment.apiUrl + `RelatorioPagamento`, pagamento, {
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
