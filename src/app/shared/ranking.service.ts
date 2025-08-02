import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RankingService {

  constructor(
    public httpClient: HttpClient
  ) {
  }

  GetRankingAtendente({ onSuccess, onError }: any): any {
    let url = environment.apiUrl + `Ranking/RankingAtendente`;
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

  GetRankingTime({ onSuccess, onError }: any): any {
    let url = environment.apiUrl + `Ranking/RankingTime`;
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

  GetGraficoMensalValores(filtro: any , { onSuccess, onError }: any): any {
    let url = environment.apiUrl + `Graficos/GraficoValoresMensal`;
    if(filtro.dataInicio != undefined && filtro.dataFim != undefined){
      url += `?DataInicio=${filtro.dataInicio}&DataFim=${filtro.dataFim}`
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

}
