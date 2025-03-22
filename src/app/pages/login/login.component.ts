import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: false
})
export class LoginComponent implements OnInit {

  loader: boolean = false;

  model: any = {
    email: '',
    senha: '',
  };

  constructor(
    private authService: AuthService,
    private toast: ToastrService,

    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    this.loader = true;
      this.authService.login(this.model, {
        onSuccess: (res: any) => {},
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


    // this.toast.error('Testasso');
    // this.toast.success('Testasso');
  }
  public goTo(route: string) {
    this.router.navigate([route]);
  }
}
