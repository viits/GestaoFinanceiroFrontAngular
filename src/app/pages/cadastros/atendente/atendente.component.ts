import { Component, OnInit } from '@angular/core';
import { IPaginator } from '../../../interface/IPaginator';
import { IFornecedor } from '../../../interface/IFornecedor';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FornecedorService } from '../../../shared/fornecedor.service';
import { ToastrService } from 'ngx-toastr';
import { ModalAtendenteComponent } from '../../../components/modal-atendente/modal-atendente.component';
import { IAtendente } from '../../../interface/IAtendente';
import { AtendenteService } from '../../../shared/atendente.service';
import { UsuarioService } from '../../../shared/usuario.service';
import { ModalHistoricoAtendenteComponent } from '../../../components/modal-historico-atendente/modal-historico-atendente.component';
import { IHistoricoAtendente } from '../../../interface/IHistoricoAtendente';
import { ModalConfirmacaoComponent } from '../../../components/modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-atendente',
  templateUrl: './atendente.component.html',
  styleUrl: './atendente.component.css',
  standalone: false
})
export class AtendenteComponent implements OnInit {
  pagination: IPaginator = {
    pageNumber: 1,
    pageSize: 5,
    qtPages: 0,
  };
  filtroAtendente: string = ''
  displayedColumns: string[] = ['nomeAtendente', 'nomeGerente' ,'porcentagem', 'acoes'];
  listAtendente: IAtendente[] = []
  listHistorico: IHistoricoAtendente[] = []
  loader: boolean = false;
  edit: boolean = false;
  timeout: any;
  atendente: IAtendente = {
    idAtendente: 0,
    idUsuario: 0,
    nomeAtendente: '',
    porcentagem: 0
  }
  larguraTela: number = 0;

  ngOnInit(): void {
    this.larguraTela = window.innerWidth;
    this.getPermissao();
    this.getAtendente();
  }
  constructor(private router: Router,
    private dialog: MatDialog,
    private atendenteService: AtendenteService,
    private usuarioService: UsuarioService,
    private toast: ToastrService) { }

  editarFornecedor(event: IAtendente) {
    this.atendente = event;
    this.openDialog();
  }
  verHistorico(event: IAtendente) {
    this.getHistoricoAtendente(event.idAtendente)

  }

  filterAtendente() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getAtendente()
    }, 500);
  }

  openDialog(): void {
    let larguraDialog = '30vw';
    let alturaDialog = '60vh';
    if (this.larguraTela < 940) {
      larguraDialog = '90vw';
      alturaDialog = '80vh';
    }
    const atendenteModal = JSON.stringify(this.atendente)
    const dialogRef = this.dialog.open(ModalAtendenteComponent, {
      data: JSON.parse(atendenteModal),
      height: alturaDialog,
      width: larguraDialog
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.atendente = {
        idAtendente: 0,
        idUsuario: 0,
        nomeAtendente: '',
        porcentagem: 0
      }
      if (result == true) {
        this.getAtendente();
      }
    });
  }

  openDialogHistorico(): void {
    let larguraDialog = '70vw';
    let alturaDialog = '80vh';
    if (this.larguraTela < 940) {
      larguraDialog = '90vw';
      alturaDialog = '80vh';
    }
    const dialogRef = this.dialog.open(ModalHistoricoAtendenteComponent, {
      data: this.listHistorico,
      height: alturaDialog,
      width: larguraDialog
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.listHistorico = []
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
        this.getDeleteAtendente(result)
      }
    });
  }

  deletar(event: IAtendente) {
    this.openDialogConfirmacao(event.idAtendente)
  }

  getPage(item: any) {
    this.pagination = {
      pageNumber: item.pageIndex + 1,
      pageSize: item.pageSize,
      qtPages: item.length
    }
    this.getAtendente();
  }

  getAtendente() {
    this.loader = true;
    this.atendenteService.getAllAtendente(this.pagination, this.filtroAtendente, {
      onSuccess: (res: any) => {
        this.listAtendente = res.data?.atendente?.listAtendentes?.map((x: any) => {
          return {
            idAtendente: x.idAtendente,
            idUsuario: x.idUsuario,
            nomeAtendente: x.nomeAtendente,
            porcentagem: x.porcentagem,
            nomeGerente: x.nomeGerente
          }
        });

        this.pagination = {
          pageNumber: res.data?.atendente.pageNumber,
          pageSize: res.data?.atendente?.pageSize,
          qtPages: res.data?.atendente?.qtPages
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

  getHistoricoAtendente(idAtendente: number) {
    this.loader = true;
    this.atendenteService.getHistoricoAtendente(idAtendente, {
      onSuccess: (res: any) => {
        this.listHistorico = res.data.listHistoricoAtendente?.map((x: IHistoricoAtendente) => {
          return x
        })
        this.loader = false;
        this.openDialogHistorico();
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
        this.openDialogHistorico();
      },

    });


  }

  getDeleteAtendente(idFornecedorAtendente: number) {
    this.loader = true;
    this.atendenteService.deletarAtendente(idFornecedorAtendente, {
      onSuccess: (res: any) => {
        this.toast.success('Deletado com sucesso.');
        this.loader = false;
        this.pagination = {
          pageNumber: 1,
          pageSize: 5,
          qtPages: 0
        };
        this.getAtendente();
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
