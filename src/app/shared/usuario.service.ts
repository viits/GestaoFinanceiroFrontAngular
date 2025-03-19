import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUsuario } from '../interface/IUsuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  constructor(
    private router: Router,
    public httpClient: HttpClient
  ) {
  }


  cadastrarUsuario(usuario: any, { onSuccess, onError }: any): any {
    this.httpClient
      .post(environment.apiUrl + `Usuario`, usuario, {
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
  editarUsuario(usuario: IUsuario, { onSuccess, onError }: any): any {
    this.httpClient
      .put(environment.apiUrl + `Usuario`, usuario, {
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
  getAllUsuario({ onSuccess, onError }: any): any {
    this.httpClient
      .get(environment.apiUrl + `Usuario`, {
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
  getPermissao({ onSuccess, onError }: any): any {
    this.httpClient
      .get(environment.apiUrl + `Usuario/Permissao`, {
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
  getAllPerfilUsuario({ onSuccess, onError }: any): any {
    this.httpClient
      .get(environment.apiUrl + `PerfilUsuario`, {
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
  verificaToken(data: any, { onSuccess, onError }: any): any {
    this.httpClient
      .post(environment.apiUrl + `Token`, data, {
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
  cadastrarChave(chave: any, { onSuccess, onError }: any): any {
    this.httpClient
      .post(environment.apiUrl + `Chave`, chave, {
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
