import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../shared/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-redefinir-senha',
    templateUrl: './redefinir-senha.component.html',
    styleUrl: './redefinir-senha.component.css',
    standalone: false
})
export class RedefinirSenhaComponent implements OnInit {

  model: any = {
    token: '',
    senha: '',
    confirmarSenha: ''
  }
  loader: boolean = false;
  btnDisabled: boolean = true;
  token:string = "";
  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('Token') || "";
  }

  constructor(
    private usuarioService: UsuarioService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  onSubmit() {
    this.loader = true;
    this.model.token = this.token;
    this.usuarioService.cadastrarChave(this.model, {
      onSuccess: (res: any) => {
        this.toast.success("Senha alterada com sucesso.");
        this.router.navigate(['/login'])
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
        this.loader = false;
      },
    });
  }

  onChangePassword(value: string, type: number) {
    if (type == 1) {
      this.model.senha = value;
    } else {
      this.model.confirmarSenha = value;
    }
    if (this.verificarValidacoes()) {
      this.btnDisabled = false;
    } else {
      this.btnDisabled = true;
    }
  }
  verificarMinCaracter() {
    if (this.model.senha.length >= 8) {
      return true
    }
    else {
      return false
    }
  }

  verificarNumero() {
    if (/\d/.test(this.model.senha)) {
      return true
    }
    else {
      return false
    }
  }
  verificarMaiuscula() {
    if (/\p{Lu}/u.test(this.model.senha)) {
      return true
    }
    else {
      return false
    }
  }

  verificarMinuscula() {
    if (/\p{Ll}/u.test(this.model.senha)) {
      return true
    }
    else {
      return false
    }
  }

  verificarEspecial() {
    if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(this.model.senha)) {
      return true
    }
    else {
      return false
    }
  }

  verificarSenhasIguais() {
    if (this.model.senha != "" && this.model.senha == this.model.confirmarSenha) {
      return true
    }
    else {
      return false
    }
  }

  verificarValidacoes() {
    if (this.verificarMinCaracter() &&
      this.verificarNumero() &&
      this.verificarMaiuscula() &&
      this.verificarMinuscula() &&
      this.verificarEspecial() &&
      this.verificarSenhasIguais()) {
      return true
    }
    else {
      return false
    }
  }

}
