import { Component, OnInit } from '@angular/core';
import { IPaginator } from '../../../interface/IPaginator';
import { IFornecedor } from '../../../interface/IFornecedor';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FornecedorService } from '../../../shared/fornecedor.service';
import { ToastrService } from 'ngx-toastr';
import { ModalFornecedorComponent } from '../../../components/modal-fornecedor/modal-fornecedor.component';
import { UsuarioService } from '../../../shared/usuario.service';
import { IHistoricoFornecedor } from '../../../interface/IHistoricoFornecedor';
import { ModalHistoricoFornecedorComponent } from '../../../components/modal-historico-fornecedor/modal-historico-fornecedor.component';
import { ModalConfirmacaoComponent } from '../../../components/modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.css',
  standalone: false
})
export class FornecedorComponent implements OnInit {

  pagination: IPaginator = {
    pageNumber: 1,
    pageSize: 5,
    qtPages: 0
  };
  displayedColumns: string[] = ['nomeFornecedor', 'porcentagem', 'acoes'];
  listFornecedor: any = []
  listHistorico: IHistoricoFornecedor[] = []

  loader: boolean = false;
  edit: boolean = false;

  fornecedor: IFornecedor = {
    idFornecedor: 0,
    nomeFornecedor: '',
    porcentagem: 0
  }
  larguraTela: number = 0;

  ngOnInit(): void {
    this.larguraTela = window.innerWidth;
    this.getPermissao();
    this.getFornecedor();
  }
  constructor(private router: Router,
    private dialog: MatDialog,
    private fornecedorService: FornecedorService,
    private usuarioService: UsuarioService,
    private toast: ToastrService) { }

  editarFornecedor(event: IFornecedor) {
    this.fornecedor = event;
    this.openDialog();
  }
  verHistorico(event: IFornecedor) {
    this.getHistoricoFornecedor(event.idFornecedor)
  }
  openDialog(): void {
    let larguraDialog = '30vw';
    let alturaDialog = '50vh';
    if (this.larguraTela < 940) {
      larguraDialog = '90vw';
      alturaDialog = '80vh';
    }
    const dialogRef = this.dialog.open(ModalFornecedorComponent, {
      data: this.fornecedor,
      height: alturaDialog,
      width: larguraDialog
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.fornecedor = {
        idFornecedor: 0,
        nomeFornecedor: '',
        porcentagem: 0
      }
      if (result == true) {
        this.getFornecedor();
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
    const dialogRef = this.dialog.open(ModalHistoricoFornecedorComponent, {
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
          this.getDeleteFornecedor(result)
        }
      });
    }

    deletar(event: IFornecedor) {
      this.openDialogConfirmacao(event.idFornecedor)
    }


  getPage(item: any) {
    this.pagination = {
      pageNumber: item.pageIndex + 1,
      pageSize: item.pageSize,
      qtPages: item.length
    }
    // console.log('Pagination: ', this.pagination)
    this.getFornecedor();
  }

  getFornecedor() {
    this.loader = true;
    this.fornecedorService.getAllFornecedor(this.pagination, {
      onSuccess: (res: any) => {
        this.listFornecedor = res.data?.fornecedor?.listFornecedores?.map((x: any) => {
          return {
            idFornecedor: x.idFornecedor,
            nomeFornecedor: x.nomeFornecedor,
            porcentagem: x.porcentagem,
          }
        });

        this.pagination = {
          pageNumber: res.data?.fornecedor.pageNumber,
          pageSize: res.data?.fornecedor?.pageSize,
          qtPages: res.data?.fornecedor?.qtPages
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
  getHistoricoFornecedor(idFornecedor: number) {
    this.loader = true;
    this.fornecedorService.getHistoricoFornecedor(idFornecedor, {
      onSuccess: (res: any) => {
        this.listHistorico = res.data.listHistoricoFornecedor?.map((x: IHistoricoFornecedor) => {
          return x;
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
        }
      },
    });
  }

  getDeleteFornecedor(idFornecedor: number) {
    this.loader = true;
    this.fornecedorService.deletarFornecedor(idFornecedor, {
      onSuccess: (res: any) => {
        this.toast.success('Deletado com sucesso.');
        this.loader = false;
        this.pagination = {
          pageNumber: 1,
          pageSize: 5,
          qtPages: 0
        };
        this.getFornecedor();
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
