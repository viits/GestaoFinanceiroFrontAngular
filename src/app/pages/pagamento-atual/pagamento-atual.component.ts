import { Component, OnInit } from '@angular/core';
import { PagamentoAtualService } from '../../shared/pagamento-atual.service';
import { ToastrService } from 'ngx-toastr';
import { IPagamentoTable } from '../../interface/IPagamentoTable';
import { IPagamento } from '../../interface/IPagamento';
import { MatDialog } from '@angular/material/dialog';
import { ModalPagamentoAtualComponent } from '../../components/modal-pagamento-atual/modal-pagamento-atual.component';
import { AtendenteService } from '../../shared/atendente.service';
import { FornecedorService } from '../../shared/fornecedor.service';
import { IDataPagamento } from '../../interface/IDataPagamento';

@Component({
  selector: 'app-pagamento-atual',
  templateUrl: './pagamento-atual.component.html',
  styleUrl: './pagamento-atual.component.css'
})
export class PagamentoAtualComponent implements OnInit {
  loader: boolean = false;
  listPagamentos: IPagamentoTable[] = []

  pagamento: IPagamento = {
    idFornecedorAtendente: 0,
    idAtendente: 0,
    idFornecedor: 0,
    idMetodoPagamento: 0,
    idStatusPagamento: 0,
    valorBruto: 0,
  }
  displayedColumns: string[] = ['nomeAtendente', 'nomeFornecedor', 'valorBruto', 'metodoPagamento', 'statusPagamento'];
  pagamentoModal: IDataPagamento = {
    atendenteSelect: [],
    fornecedorSelect: [],
    metodoPagamento: [],
    pagamento: this.pagamento
  }
  ngOnInit(): void {
    this.getPagamentoAtual();
    this.getAllAtendentes();
    this.getAllFornecedores();
    this.getAllMetodoPagamento();
  }
  constructor(private pagamentoService: PagamentoAtualService,
    private atendenteService: AtendenteService,
    private fornecedorService: FornecedorService,
    private toast: ToastrService,
    private dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalPagamentoAtualComponent, {
      data: this.pagamentoModal,
      height: '30vw',
      width: '50vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.pagamento = {
        idFornecedorAtendente: 0,
        idAtendente: 0,
        idFornecedor: 0,
        idMetodoPagamento: 0,
        idStatusPagamento: 0,
        valorBruto: 0,
      }
      this.getPagamentoAtual();
    });
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

  getPagamentoAtual() {
    this.loader = true;
    this.pagamentoService.getAllPagamentoAtual({

      onSuccess: (res: any) => {
        this.listPagamentos =  res?.data?.listPagamentos?.map((x: any) => {

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
            valorLiquidoFornecedor: x.valorLiquidoFornecedor
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

}
