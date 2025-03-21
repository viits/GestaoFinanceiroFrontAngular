import { Component, OnInit } from '@angular/core';
import { IPagamentoTable } from '../../interface/IPagamentoTable';
import { IPagamento } from '../../interface/IPagamento';
import { ToastrService } from 'ngx-toastr';
import { PagamentoAtualService } from '../../shared/pagamento-atual.service';
import { AtendenteService } from '../../shared/atendente.service';
import { ISelect } from '../../interface/ISelect';
import { FornecedorService } from '../../shared/fornecedor.service';

@Component({
  selector: 'app-gerar-balancete',
  templateUrl: './gerar-balancete.component.html',
  styleUrl: './gerar-balancete.component.css'
})
export class GerarBalanceteComponent implements OnInit {
  totalBruto: number = 0;
  totalLiqAtendente: number = 0;
  totalLiqFornecedor: number = 0;
  edit: boolean = false;
  loader: boolean = false;
  listPagamentos: IPagamentoTable[] = []
  listAtendentes: ISelect[] = [
    {
      name: 'Todos',
      value: 0
    }
  ]
  listFornecedores: ISelect[] = [
    {
      name: 'Todos',
      value: 0
    }
  ]

  pagamento: IPagamento = {
    idFornecedorAtendente: 0,
    idAtendente: 0,
    idFornecedor: 0,
    idMetodoPagamento: 0,
    idStatusPagamento: 0,
    valorBruto: 0,
  }

  displayedColumns: string[] = [
    'nomeFornecedor',
    'nomeAtendente',
    'valorBruto',
    'metodoPagamento',
    'statusPagamento',
    'valorLiquidoAtendente',
    'valorLiquidoFornecedor',
    'dataVenda'
  ];
  data: any = {
    dataInicio: '',
    dataFim: '',
    idAtendente: 0,
    idFornecedor: 0
  }

  constructor(private pagamentoService: PagamentoAtualService,
    private toast: ToastrService,
    private atendenteService: AtendenteService,
    private fornecedorService: FornecedorService
  ) { }
  ngOnInit(): void {
    this.getAllAtendentes();
    this.getAllFornecedores();
  }
  getAllFornecedores() {
    this.loader = true;
    this.fornecedorService.getAllFornecedorSelect({
      onSuccess: (res: any) => {
        res?.data?.listFornecedores?.map((x: any) => {
          this.listFornecedores.push({
            value: x.idFornecedor,
            name: x.nomeFornecedor
          })
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
        }
        this.loader = false;
      },
    });
  }

  getAllAtendentes() {
    this.loader = true;
    this.atendenteService.getAllAtendenteSelect({
      onSuccess: (res: any) => {
        res?.data?.listAtendentes?.map((x: any) => {
          this.listAtendentes.push({
            value: x.idAtendente,
            name: x.nomeAtendente
          })
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
        }
        this.loader = false;
      },
    });
  }

  getRelatorioPagamento() {
    this.totalBruto = 0;
    this.totalLiqAtendente = 0;
    this.totalLiqFornecedor = 0;
    this.loader = true;
    this.pagamentoService.getBalancete(this.data, {
      onSuccess: (res: any) => {
        this.listPagamentos = res?.data?.listRelatorioPagamentos?.map((x: any) => {
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
            dataVenda: this.formatarData(x.dataVenda)
          }
        })
        if (this.listPagamentos.length > 0) {
          this.listPagamentos?.map((x: any) => {
            if (x.idStatusPagamento == 1) {
              this.totalBruto += x.valorBruto;
              this.totalLiqAtendente += x.valorLiquidoAtendente;
              this.totalLiqFornecedor += x.valorLiquidoFornecedor;
            }
          })
        } else {
          this.totalBruto = 0;
          this.totalLiqAtendente = 0;
          this.totalLiqFornecedor = 0;
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
        this.loader = false;
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
}
