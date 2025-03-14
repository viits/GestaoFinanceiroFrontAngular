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

@Component({
  selector: 'app-relatorio-pagamento',
  templateUrl: './relatorio-pagamento.component.html',
  styleUrl: './relatorio-pagamento.component.css'
})
export class RelatorioPagamentoComponent implements OnInit {

  edit: boolean = false;
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
  pagamentoModal: IDataPagamento = {
    atendenteSelect: [],
    fornecedorSelect: [],
    metodoPagamento: [],
    pagamento: this.pagamento
  }
  pagination: IPaginator = {
    pageNumber: 1,
    pageSize: 5,
    qtPages: 0
  };
  displayedColumns: string[] = ['nomeAtendente', 'nomeFornecedor', 'valorBruto', 'metodoPagamento', 'statusPagamento'];


  ngOnInit(): void {
    this.getAllAtendentes();
    this.getAllFornecedores();
    this.getAllMetodoPagamento();
    this.getRelatorioPagamento();
  }
  constructor(private pagamentoService: PagamentoAtualService,
    private atendenteService: AtendenteService,
    private fornecedorService: FornecedorService,
    private toast: ToastrService,
    private dialog: MatDialog) { }

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

  getRelatorioPagamento() {
    this.loader = true;
    this.pagamentoService.getAllPagamentoRelatorio(this.pagination, {

      onSuccess: (res: any) => {
        // console.log('Res: ', res)
        this.listPagamentos =  res?.data?.listRelatorioPagamentos?.pagamentoResponse?.map((x: any) => {

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
  getPage(item: any) {
    this.pagination = {
      pageNumber: item.pageIndex + 1,
      pageSize: item.pageSize,
      qtPages: item.length
    }
    this.getRelatorioPagamento();
  }

}
