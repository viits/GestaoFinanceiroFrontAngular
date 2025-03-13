import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../shared/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent implements OnInit {
  model: any = {
    nomeUsuario: '',
    email: '',
    telefone: '',
  }
  loader: boolean = false;
  ngOnInit(): void {
  }

  constructor(private router: Router, private usuarioService: UsuarioService, private toast: ToastrService) { }

  public goTo(route: string) {
    this.router.navigate([route]);
  }

  onSubmit() {
    this.loader = true;
    if (!this.verifyFields()) {
      this.toast.error('Preencha os campos obrigatórios!');
      this.loader = false;
      return;
    }
    this.usuarioService.cadastrarUsuario(this.model, {
      onSuccess: (res: any) => {
        this.toast.success('Usuário cadastrado com sucesso.');
        this.loader = false;
        this.router.navigate(['usuario'])
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

  verifyFields() {
    if (this.model.nomeUsuario == '' || this.model.email == '') {
      return false
    }
    return true;
  }


}
