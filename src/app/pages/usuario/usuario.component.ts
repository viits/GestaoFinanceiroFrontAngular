import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UsuarioService } from '../../shared/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { IUsuario } from '../../interface/IUsuario';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuarioComponent } from '../../components/modal-usuario/modal-usuario.component';

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
  usuario: IUsuario = {
    idUsuario: 0,
    nomeUsuario: '',
    email: '',
    telefone: ''
  }
  displayedColumns: string[] = ['nomeUsuario', 'email', 'telefone', 'acoes'];

  ngOnInit(): void {
    this.getAllUsuario();
  }
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) { }
  editarUsuario(event: IUsuario) {
    // console.log(event)
    this.usuario = event;
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalUsuarioComponent, {
      data: this.usuario,
      height: '30vw',
      width: '50vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.usuario = {
        idUsuario: 0,
        nomeUsuario: '',
        email: '',
        telefone: ''
      }
      if (result == true) {
        this.getAllUsuario();
      }
    });
  }

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



  public goTo(route: string) {
    this.router.navigate([route]);
  }

  formatarTelefone(num: string) {
    if (num != null && num != "") {
      const codigoArea = num.slice(0, 2);
      const parte1 = num.slice(2, 7);
      const parte2 = num.slice(7);

      const numeroFormatado = `(${codigoArea})${parte1}-${parte2}`;
      return numeroFormatado;
    }
    else {
      return "Não informado"
    }
  }
}
