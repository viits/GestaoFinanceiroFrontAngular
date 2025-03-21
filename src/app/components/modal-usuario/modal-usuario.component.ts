import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../shared/usuario.service';
import { IUsuario } from '../../interface/IUsuario';
import { IDataUsuario } from '../../interface/IDataUsuario';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent implements OnInit {
  loader: boolean = false;
  edit: boolean = false;

  ngOnInit(): void {
    if (this.data.usuario.idUsuario != 0) {
      this.edit = true;
    }
  }
  constructor(
    public dialogRef: MatDialogRef<ModalUsuarioComponent>,
    private toast: ToastrService,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: IDataUsuario
  ) { }

  close(value: boolean = false): void {
    this.dialogRef.close(value);
  }
  verifyFields() {
    if (this.data.usuario.nomeUsuario == '' || this.data.usuario.email == '') {
      return false;
    }
    return true;
  }
  cadastrarUsuario() {
    this.loader = true
    this.usuarioService.cadastrarUsuario(this.data.usuario, {
      onSuccess: (res: any) => {
        this.toast.success('Usuário cadastrado com sucesso.');
        this.loader = false;
        this.close(true);
      },
      onError: (error: any) => {
        this.loader = false;
        if (error.status != 400) {
          this.toast.error('Ocorreu um erro, tente novamente mais tarde!');
        } else {
          error.error.Erros?.map((x: any) => {
            this.toast.error(x);
          });
        }
      },
    });
  }
  editarUsuario() {
    this.loader = true;
    this.usuarioService.editarUsuario(this.data.usuario, {
      onSuccess: (res: any) => {
        this.toast.success('Atualizado com sucesso.');
        this.loader = false;
        this.close(true);
      },
      onError: (error: any) => {
        this.loader = false;
        if (error.status != 400) {
          this.toast.error('Ocorreu um erro, tente novamente mais tarde!');
        } else {
          error.error.Erros?.map((x: any) => {
            this.toast.error(x);
          });
        }
      },
    });
  }

  onSubmit() {
    if (!this.verifyFields()) {
      this.toast.error('Preencha os campos obrigatórios!');
      this.loader = false;
      return;
    }
    if (this.edit == true) {
      this.editarUsuario();
    }
    else {
      this.cadastrarUsuario();
    }
  }

}
