import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { UsuarioService } from '../../shared/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
    standalone: false
})
export class MenuComponent implements OnInit {
  isMenuOpen = false;
  loader = false;
  permissaoUsuario: string = ""
  isMenuExpanded: boolean = false

  constructor(private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.verificaToken();
    this.getPermissao();
  }

  public goTo(route: string) {
    this.router.navigate([route]);
  }
  logout() {
    this.authService.logout();
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getPermissao() {
    this.loader = true;
    this.usuarioService.getPermissao({
      onSuccess: (res: any) => {
        this.permissaoUsuario = res.data.permissao
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
          this.logout();
        }
      },
    });
  }
  verificaToken() {
    this.loader = true;
    const tokenData: any = {
      token: localStorage.getItem('token')
    }
    this.usuarioService.verificaToken(tokenData, {
      onSuccess: (res: any) => {
        // this.permissaoUsuario = res.data.permissao
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
          this.logout();
        }
      },
    });
  }

}
