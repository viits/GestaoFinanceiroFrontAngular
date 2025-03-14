import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UsuarioService } from '../../shared/usuario.service';
import { ToastrService } from 'ngx-toastr';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  loader: boolean = false;
  listUsuario: any = [];
  ngOnInit(): void {
    this.getAllUsuario();
  }
  constructor(private router: Router, private usuarioService: UsuarioService, private toast: ToastrService) { }

  getAllUsuario() {
    this.loader = true;
    this.usuarioService.getAllUsuario({
      onSuccess: (res: any) => {
        this.listUsuario = res.data.listUsuarios?.map((x: any) => {
          return {
            idUsuario: x.idUsuario,
            nomeUsuario: x.nomeUsuario,
            email: x.email,
            telefone: x.telefone
          }
        })
        this.loader = false;
      },
      onError: (error: any) => {
        this.loader = false;
        if (error.status != 400) {
          this.toast.error('Ocorreu um erro, tente novamente mais tarde!');
        } else {
          error.error.errors?.map((x: any) => {
            this.toast.error(x);
          });
          // this.toast.error('Email ou senha inválidos!');
        }
        this.loader = false;
      },
    });


    // this.toast.error('Testasso');
    // this.toast.success('Testasso');
  }

  displayedColumns: string[] = ['nomeUsuario', 'email', 'telefone', 'acoes'];


  public goTo(route: string) {
    this.router.navigate([route]);
  }

}
