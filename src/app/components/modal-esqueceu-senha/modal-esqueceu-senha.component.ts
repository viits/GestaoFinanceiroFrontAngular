import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../shared/usuario.service';

@Component({
  selector: 'app-modal-esqueceu-senha',
  standalone: false,
  templateUrl: './modal-esqueceu-senha.component.html',
  styleUrl: './modal-esqueceu-senha.component.css'
})
export class ModalEsqueceuSenhaComponent implements OnInit {
  email: string = '';
  loader: boolean = false;
  ngOnInit(): void {
  }
  constructor(
    public dialogRef: MatDialogRef<ModalEsqueceuSenhaComponent>,
    private toast: ToastrService,
    private usuarioService: UsuarioService,
  ) { }

  onSubmit() {
    this.enviarEmail();
  }

  enviarEmail() {
    this.loader = true;
    const data = {
      email: this.email
    }
    this.usuarioService.enviarEmail(data, {
      onSuccess: (res: any) => {
        this.toast.success('Email enviado com sucesso.');
        this.loader = false;
        this.close();
      },
      onError: (error: any) => {
        this.loader = false;
        if (error.status != 400) {
          this.toast.error('Ocorreu um erro, tente novamente mais tarde!');
        } else {
          error.error.errors?.map((x: any) => {
            this.toast.error(x);
          });
        }
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
