import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ModalEsqueceuSenhaComponent } from '../../components/modal-esqueceu-senha/modal-esqueceu-senha.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent implements OnInit {

  loader: boolean = false;
  larguraTela: number = 0;

  model: any = {
    email: '',
    senha: '',
  };

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.larguraTela = window.innerWidth;
  }

  onSubmit() {
    this.loader = true;
    this.authService.login(this.model, {
      onSuccess: (res: any) => { },
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
      },
    });

  }

  openDialog(): void {
    let larguraDialog = '30vw';
    let alturaDialog = '40vh';
    if (this.larguraTela < 940) {
      larguraDialog = '90vw';
      alturaDialog = '50vh';
    }
    const dialogRef = this.dialog.open(ModalEsqueceuSenhaComponent, {
      height: alturaDialog,
      width: larguraDialog
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  public goTo(route: string) {
    this.router.navigate([route]);
  }
}
