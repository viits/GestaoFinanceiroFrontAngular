import { Component, OnInit } from '@angular/core';
import { IPagamentoTable } from '../../interface/IPagamentoTable';
import { IPagamento } from '../../interface/IPagamento';
import { ToastrService } from 'ngx-toastr';
import { PagamentoAtualService } from '../../shared/pagamento-atual.service';
import { AtendenteService } from '../../shared/atendente.service';
import { ISelect } from '../../interface/ISelect';
import { FornecedorService } from '../../shared/fornecedor.service';
import { GerenteService } from '../../shared/gerente.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-gerar-balancete',
  templateUrl: './gerar-balancete.component.html',
  styleUrl: './gerar-balancete.component.css',
  standalone: false
})
export class GerarBalanceteComponent implements OnInit {
  totalBruto: number = 0;
  totalTime: number = 0;
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
  listGerente: ISelect[] = [
    {
      name: 'Todos',
      value: 0
    }
  ]

  pagamento: IPagamento = {
    idFornecedorAtendente: 0,
    idAtendente: 0,
    idAtendente2: 0,
    idFornecedor: 0,
    idMetodoPagamento: 0,
    idStatusPagamento: 0,
    valorBruto: 0,
  }
  atendenteSelectFiltrado: ISelect[] = []
  displayedColumns: string[] = [
    'nomeFornecedor',
    'nomeAtendente',
    'nomeAtendente2',
    'valorBruto',
    'metodoPagamento',
    'statusPagamento',
    'valorLiquidoAtendente',
    'valorLiquidoAtendente2',
    'valorLiquidoFornecedor',
    'valorLiquidoTime',
    'dataVenda'
  ];
  data: any = {
    dataInicio: '',
    dataFim: '',
    idAtendente: 0,
    idFornecedor: 0,
    idGerente: 0,
    nomeAtendente: 'Todos'
  }
  baixarPdf: boolean = false;
  desabilitaAtendente: boolean = false;

  constructor(private pagamentoService: PagamentoAtualService,
    private toast: ToastrService,
    private atendenteService: AtendenteService,
    private fornecedorService: FornecedorService,
    private gerenteService: GerenteService
  ) { }
  ngOnInit(): void {
    this.getAllAtendentes();
    this.getAllFornecedores();
    this.getGeretente();
  }
  baixaPDF() {
    this.baixarPdf = true;
  }
  getGeretente() {
    this.loader = true;
    this.gerenteService.getAllGerenteSelect({
      onSuccess: (res: any) => {
        res.data.listGerente?.map((x: any) => {
          this.listGerente.push({
            value: x.idUsuario,
            name: x.nomeUsuario
          });
        });
        this.loader = false;
      },
      onError: (error: any) => {
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
        let list = JSON.stringify(this.listAtendentes)
        this.atendenteSelectFiltrado = JSON.parse(list)
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
    this.totalTime = 0;
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
            idAtendente2: x.idAtendente2,
            idFornecedor: x.idFornecedor,
            idMetodoPagamento: x.idMetodoPagamento,
            idStatusPagamento: x.idStatusPagamento,
            nomeAtendente: x.nomeAtendente,
            nomeAtendente2: x.nomeAtendente2 != '' ? x.nomeAtendente2 : '-',
            nomeFornecedor: x.nomeFornecedor,
            metodoPagamento: x.metodoPagamento,
            statusPagamento: x.statusPagamento,
            valorBruto: x.valorBruto,
            valorLiquidoAtendente: x.valorLiquidoAtendente,
            valorLiquidoAtendente2: x.valorLiquidoAtendente2,
            valorLiquidoFornecedor: x.valorLiquidoFornecedor,
            valorLiquidoTime: x.valorLiquidoTime,
            dataVenda: this.formatarData(x.dataVenda)
          }
        })
        if (this.listPagamentos.length > 0) {
          this.listPagamentos?.map((x: any) => {
            if (x.idStatusPagamento == 1) {
              this.totalBruto += x.valorBruto;
              this.totalLiqAtendente += x.valorLiquidoAtendente;
              this.totalLiqFornecedor += x.valorLiquidoFornecedor;
              this.totalTime += x.valorLiquidoTime;
            }
          })
        } else {
          this.totalTime = 0;
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

  onChangeAtendente(value: any) {
    let filterValue = ''
    if (typeof value == 'string') {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value.name.toLowerCase();
    }

    this.atendenteSelectFiltrado = this.listAtendentes.filter(item =>
      item.name.toLowerCase().includes(filterValue)
    );
  }
  onOptionSelected(event: any) {
    this.data.idAtendente = event.option.value.value;
    this.data.nomeAtendente = event.option.value.name;
  }
  displayFn(option: any): string {
    return option && option.name ? option.name : option;
  }

  gerarPDF() {
    const element = document.getElementById('conteudoPDF');
    if (!element) {
      console.error('Elemento não encontrado!');
      return;
    }

    html2canvas(element, { scale: 2 }).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      pdf.save('Balancete');
    });
  }

}
