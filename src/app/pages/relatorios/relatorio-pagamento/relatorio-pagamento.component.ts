import { Component, OnInit } from '@angular/core';
import { IPagamentoTable } from '../../../interface/IPagamentoTable';
import { IPagamento } from '../../../interface/IPagamento';
import { PagamentoAtualService } from '../../../shared/pagamento-atual.service';
import { AtendenteService } from '../../../shared/atendente.service';
import { FornecedorService } from '../../../shared/fornecedor.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { IDataPagamento } from '../../../interface/IDataPagamento';
import { IPaginator } from '../../../interface/IPaginator';
import { ModalPagamentoAtualComponent } from '../../../components/modal-pagamento-atual/modal-pagamento-atual.component';
import { ModalRelatorioPagamentoComponent } from '../../../components/modal-relatorio-pagamento/modal-relatorio-pagamento.component';
import { DatePipe } from '@angular/common';
import { StatusPagamentoService } from '../../../shared/status-pagamento.service';
import { IHistoricoBalancete } from '../../../interface/IHistoricoBalancete';
import { ModalHistoricoBalanceteComponent } from '../../../components/modal-historico-balancete/modal-historico-balancete.component';
import { ModalConfirmacaoComponent } from '../../../components/modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-relatorio-pagamento',
  templateUrl: './relatorio-pagamento.component.html',
  styleUrl: './relatorio-pagamento.component.css',
  standalone: false
})
export class RelatorioPagamentoComponent implements OnInit {

  edit: boolean = false;
  loader: boolean = false;
  listPagamentos: IPagamentoTable[] = []
  listHistorico: IHistoricoBalancete[] = []

  pagamento: IPagamento = {
    idFornecedorAtendente: 0,
    idAtendente: 0,
    idFornecedor: 0,
    idMetodoPagamento: 0,
    idStatusPagamento: 0,
    valorBruto: 0,
  }
  pagamentoModal: IDataPagamento = {
    atendenteSelect: [],
    fornecedorSelect: [],
    metodoPagamento: [],
    statusPagamento: [],
    pagamento: this.pagamento
  }
  pagination: IPaginator = {
    pageNumber: 1,
    pageSize: 5,
    qtPages: 0
  };
  displayedColumns: string[] = [
    'nomeAtendente',
    'nomeFornecedor',
    'valorBruto',
    'metodoPagamento',
    'statusPagamento',
    'valorLiquidoAtendente',
    'valorLiquidoFornecedor',
    'valorLiquidoTime',
    'dataVenda',
    'acoes'
  ];

  larguraTela: number = 0;
  ngOnInit(): void {
    this.larguraTela = window.innerWidth;
    this.getAllAtendentes();
    this.getAllFornecedores();
    this.getAllMetodoPagamento();
    this.getAllStatusPagamento();
    this.getRelatorioPagamento();
  }
  constructor(private pagamentoService: PagamentoAtualService,
    private atendenteService: AtendenteService,
    private fornecedorService: FornecedorService,
    private statusPagamentoService: StatusPagamentoService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) { }

  openDialog(): void {
    let larguraDialog = '30vw';
    let alturaDialog = '90vh';
    if (this.larguraTela < 940) {
      larguraDialog = '90vw';
      alturaDialog = '90vh';
    }
    const pagamentosModal = JSON.stringify(this.pagamentoModal)
    const dialogRef = this.dialog.open(ModalRelatorioPagamentoComponent, {
      data: JSON.parse(pagamentosModal),
      height: alturaDialog,
      width: larguraDialog
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.pagamentoModal.pagamento = {
        idFornecedorAtendente: 0,
        idAtendente: 0,
        idFornecedor: 0,
        idMetodoPagamento: 0,
        idStatusPagamento: 0,
        valorBruto: 0,
        dataVenda: new Date()
      }
      if (result == true) {
        this.getRelatorioPagamento();
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
    const dialogRef = this.dialog.open(ModalHistoricoBalanceteComponent, {
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
        this.getDeletePagamento(result)
      }
    });
  }
  deletarPagamento(event: IPagamento) {
    this.openDialogConfirmacao(event.idFornecedorAtendente)
  }
  editarFornecedor(event: IPagamento) {
    // console.log(event)
    this.pagamentoModal.pagamento = event;
    this.openDialog();
  }
  verHistorico(event: IPagamento) {
    this.getHistoricoBalancete(event.idFornecedorAtendente)
  }

  getAllAtendentes() {
    this.loader = true;
    this.atendenteService.getAllAtendenteSelect({
      onSuccess: (res: any) => {
        this.pagamentoModal.atendenteSelect = res?.data?.listAtendentes?.map((x: any) => {
          return {
            value: x.idAtendente,
            name: x.nomeAtendente
          }
        })
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

  getAllStatusPagamento() {
    this.loader = true;
    this.statusPagamentoService.getAllStatusPagamentoSelect({
      onSuccess: (res: any) => {
        this.pagamentoModal.statusPagamento = res?.data?.listStatusPagamentos?.map((x: any) => {
          return {
            value: x.idStatusPagamento,
            name: x.statusPagamento
          }
        })
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

  getAllFornecedores() {
    this.loader = true;
    this.fornecedorService.getAllFornecedorSelect({
      onSuccess: (res: any) => {
        this.pagamentoModal.fornecedorSelect = res?.data?.listFornecedores?.map((x: any) => {
          return {
            value: x.idFornecedor,
            name: x.nomeFornecedor
          }
        })
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
  getAllMetodoPagamento() {
    this.loader = true;
    this.pagamentoService.getAllMetodoPagamentoSelect({
      onSuccess: (res: any) => {
        this.pagamentoModal.metodoPagamento = res?.data?.listMetodoPagamento?.map((x: any) => {
          return {
            value: x.idMetodoPagamento,
            name: x.metodoPagamento
          }
        })
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

  getRelatorioPagamento() {
    this.loader = true;
    this.pagamentoService.getAllPagamentoRelatorio(this.pagination, {

      onSuccess: (res: any) => {
        this.listPagamentos = res?.data?.listRelatorioPagamentos?.pagamentoResponse?.map((x: any) => {

          return {
            idFornecedorAtendente: x.idFornecedorAtendente,
            idAtendente: x.idAtendente,
            idFornecedor: x.idFornecedor,
            idMetodoPagamento: x.idMetodoPagamento,
            idStatusPagamento: x.idStatusPagamento,
            nomeAtendente: x.nomeAtendente,
            nomeFornecedor: x.nomeFornecedor,
            metodoPagamento: x.metodoPagamento,
            statusPagamento: x.statusPagamento,
            valorBruto: x.valorBruto,
            valorLiquidoAtendente: x.valorLiquidoAtendente,
            valorLiquidoFornecedor: x.valorLiquidoFornecedor,
            valorLiquidoTime: x.valorLiquidoTime,
            dataVenda: this.formatarData(x.dataVenda)
          }
        })
        this.pagination = {
          pageNumber: res.data?.listRelatorioPagamentos?.pageNumber,
          pageSize: res.data?.listRelatorioPagamentos?.pageSize,
          qtPages: res.data?.listRelatorioPagamentos?.qtPages
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
  getHistoricoBalancete(idFornecedorAtendente: number) {
    this.loader = true;
    this.pagamentoService.getHistoricoBalancete(idFornecedorAtendente, {
      onSuccess: (res: any) => {
        this.listHistorico = res.data.listHistoricoBalancete?.map((x: IHistoricoBalancete) => {
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
  getDeletePagamento(idFornecedorAtendente: number) {
    this.loader = true;
    this.pagamentoService.deletarPagamentoRelatorio(idFornecedorAtendente, {
      onSuccess: (res: any) => {
        this.toast.success('Deletado com sucesso.');
        this.loader = false;
        this.pagination = {
          pageNumber: 1,
          pageSize: 5,
          qtPages: 0
        };
        this.getRelatorioPagamento();
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
  formatarData(dt: any) {
    if (dt != null) {
      var dataFormatada;
      const data = new Date(dt);

      data.setMinutes(data.getMinutes() + data.getTimezoneOffset());

      const dia = data.getDate();
      const mes = data.getMonth() + 1;
      const ano = data.getFullYear();

      const diaFormatado = dia < 10 ? `0${dia}` : `${dia}`;
      const mesFormatado = mes < 10 ? `0${mes}` : `${mes}`;

      dataFormatada = `${ano}-${mesFormatado}-${diaFormatado}`;
      return dataFormatada;
    } else {
      return "";
    }
  }
  formatarDataTable(dt: any) {
    if (dt != null) {
      var dataFormatada;
      const data = new Date(dt);

      data.setMinutes(data.getMinutes() + data.getTimezoneOffset());

      const dia = data.getDate();
      const mes = data.getMonth() + 1;
      const ano = data.getFullYear();

      const diaFormatado = dia < 10 ? `0${dia}` : `${dia}`;
      const mesFormatado = mes < 10 ? `0${mes}` : `${mes}`;

      dataFormatada = `${diaFormatado}/${mesFormatado}/${ano}`;
      return dataFormatada;
    } else {
      return "";
    }
  }
  getPage(item: any) {
    this.pagination = {
      pageNumber: item.pageIndex + 1,
      pageSize: item.pageSize,
      qtPages: item.length
    }
    this.getRelatorioPagamento();
  }

}
