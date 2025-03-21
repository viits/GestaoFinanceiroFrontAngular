import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    public httpClient: HttpClient
  ) {
    this.userLoggedIn.next(false);
  }


  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }
  get isLoggedIn() {
    return this.userLoggedIn.asObservable();
  }



  login(login: any, { onSuccess, onError }: any): any {
    localStorage.clear();
    this.httpClient
      .post(environment.apiUrl + `Login`, login, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          type: 'application/json',
          Authorization: "Bearer " + localStorage.getItem('token'),
        },
      })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem(
            'token',
            res.data.token
          );
          localStorage.setItem(
            'nmUsuario',
            res.data.nomeUsuario
          );
          localStorage.setItem('usuario', JSON.stringify(res.data));

          this.setUserLoggedIn(true);
          if(res.data.perfilUsuario != "Administrador"){
            this.router.navigate(['/relatorio/balancete']);
          }else{
            this.router.navigate(['/home']);
          }

          return onSuccess(res);
        },
        error: (error: any) => {
          return onError(error);
        },
      });
  }


  esqueceuSenha(email: any, { onSuccess, onError }: any) {
    let url = environment.apiUrl + 'Login/EsqueceuSenha'
    this.httpClient
      .post(url, email, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          type: 'application/json',
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

  logout(): void {
    localStorage.clear();
    this.setUserLoggedIn(false);
    this.router.navigate(['/login']);
  }
}
