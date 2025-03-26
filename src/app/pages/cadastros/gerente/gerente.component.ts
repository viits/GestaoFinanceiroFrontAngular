import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalGerenteComponent } from '../../../components/modal-gerente/modal-gerente.component';
import { MatDialog } from '@angular/material/dialog';
import { IPaginator } from '../../../interface/IPaginator';
import { GerenteService } from '../../../shared/gerente.service';
import { ToastrService } from 'ngx-toastr';
import { IGerente } from '../../../interface/IGerente';
import { UsuarioService } from '../../../shared/usuario.service';
import { ModalConfirmacaoComponent } from '../../../components/modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrl: './gerente.component.css',
  standalone: false
})
export class GerenteComponent implements OnInit {
  pagination: IPaginator = {
    pageNumber: 1,
    pageSize: 8,
    qtPages: 0
  };
  displayedColumns: string[] = ['nomeUsuario', 'email', 'telefone', 'acoes'];
  listGerente: any = []
  loader: boolean = false;
  edit: boolean = false;

  gerente: IGerente = {
    idUsuario: 0,
    nomeUsuario: '',
    email: '',
    telefone: '',
    idPerfilUsuario: 0
  }
  larguraTela: number = 0;

  ngOnInit(): void {
    this.larguraTela = window.innerWidth;
    this.getPermissao();
    this.getGerente();
  }
  constructor(private router: Router,
    private dialog: MatDialog,
    private gerenteService: GerenteService,
    private usuarioService: UsuarioService,
    private toast: ToastrService) { }

  editarGerente(event: IGerente) {
    // console.log(event)
    this.gerente = event;
    this.openDialog();
  }


  openDialog(): void {
    let larguraDialog = '30vw';
    let alturaDialog = '50vh';
    if (this.larguraTela < 940) {
      larguraDialog = '90vw';
      alturaDialog = '80vh';
    }
    const dialogRef = this.dialog.open(ModalGerenteComponent, {
      data: this.gerente,
      height: alturaDialog,
      width: larguraDialog
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.gerente = {
        idUsuario: 0,
        nomeUsuario: '',
        email: '',
        telefone: '',
        idPerfilUsuario: 0
      }
      if (result == true) {
        this.getGerente();
      }
    });
  }

  openDialogConfirmacao(idFornecedorAtendente: number): void {
    let larguraDialog = '30vw';
    let alturaDialog = '30vh';
    if (this.larguraTela < 940) {
      larguraDialog = '90vw';
      alturaDialog = '80vh';
    }
    const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
      data: idFornecedorAtendente,
      height: alturaDialog,
      width: larguraDialog
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result != 0 && result != undefined) {
        this.deleteGerente(result)
      }
    });
  }

  deletar(event: IGerente) {
    this.openDialogConfirmacao(event.idUsuario)
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
  getPage(item: any) {
    this.pagination = {
      pageNumber: item.pageIndex + 1,
      pageSize: item.pageSize,
      qtPages: item.length
    }
    // console.log('Pagination: ', this.pagination)
    this.getGerente();
  }
  getGerente() {
    this.loader = true;
    this.gerenteService.getAllGerente(this.pagination, {
      onSuccess: (res: any) => {
        this.listGerente = res.data?.gerente?.listGerentes?.map((x: any) => {
          return {
            idUsuario: x.idUsuario,
            nomeUsuario: x.nomeUsuario,
            email: x.email,
            telefone: x.telefone
          }
        });

        this.pagination = {
          pageNumber: res.data?.gerente.pageNumber,
          pageSize: res.data?.gerente?.pageSize,
          qtPages: res.data?.gerente?.qtPages
        };
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


  }

  getPermissao() {
    this.loader = true;
    this.usuarioService.getPermissao({
      onSuccess: (res: any) => {
        if (res.data.permissao != 'Administrador') {
          this.toast.error('Você não tem permissão');
          this.router.navigate(['/relatorio/balancete'])
        }
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
        }
      },
    });
  }

  public goTo(route: string) {
    this.router.navigate([route]);
  }

  deleteGerente(idGerente: number) {
    this.loader = true;
    this.gerenteService.deletarGerente(idGerente, {
      onSuccess: (res: any) => {
        this.toast.success('Deletado com sucesso.');
        this.loader = false;
        this.pagination = {
          pageNumber: 1,
          pageSize: 5,
          qtPages: 0
        };
        this.getGerente();
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

}
