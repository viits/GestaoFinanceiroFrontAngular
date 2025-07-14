import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IPagamentoTable } from '../../interface/IPagamentoTable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-pdf-balancete',
  templateUrl: './pdf-balancete.component.html',
  styleUrl: './pdf-balancete.component.css',
  standalone: false
})
export class PdfBalanceteComponent implements OnInit, OnChanges {
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
    'dataVenda'
  ];

  @Input() listPagamentos: IPagamentoTable[] = [];

  @Input() totalBruto: number = 0;
  @Input() totalLiqAtendente: number = 0;
  @Input() totalLiqFornecedor: number = 0;
  @Output() baixado = new EventEmitter();
  ngOnChanges(changes: SimpleChanges) {
    if (changes['listPagamentos'] && this.listPagamentos.length > 0) {
      const json = JSON.stringify(this.listPagamentos);
      this.listPagamentos = JSON.parse(json);
      this.listPagamentos.map((x: any) => {
        x.valorBruto = x.valorBruto.toLocaleString(
          'pt-BR',
          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        )
        x.valorLiquidoAtendente = x.valorLiquidoAtendente.toLocaleString(
          'pt-BR',
          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        )
         x.valorLiquidoAtendente2 = x.valorLiquidoAtendente2.toLocaleString(
          'pt-BR',
          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        )
        x.valorLiquidoFornecedor = x.valorLiquidoFornecedor.toLocaleString(
          'pt-BR',
          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        )
      })
      this.gerarPDF();
    }
  }
  ngOnInit(): void {

  }

  gerarPDF() {
    const columnLabels: { [key: string]: string } = {
      nomeFornecedor: "For.",
      nomeAtendente: "Aten.",
      nomeAtendente2: "2ºAten.",
      valorBruto: "Valor Bruto",
      metodoPagamento: "Mét. Pagamento",
      statusPagamento: "Status Pagamento",
      valorLiquidoAtendente: "Vl Líq. Atendente",
      valorLiquidoAtendente2: "Vl Líq. 2ºAtendente",
      valorLiquidoFornecedor: "Vl Líq. Fornecedor",
      dataVenda: "Data da Venda"
    };
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.width;

    doc.text('Balancete', 10, 10);

    autoTable(doc, {
      head: [this.displayedColumns.map(col => columnLabels[col] || col)],
      body: this.listPagamentos.map(item =>{
        item.dataVenda = this.formatarDataTable(item.dataVenda)
        return this.displayedColumns.map(col => item[col as keyof IPagamentoTable])}
      ),
      startY: 20, // Define onde começa a tabela para evitar sobreposição com o título
      margin: { bottom: 20, right: 10 }, // Evita cortes no final da página
      styles: {
        fontSize: 10,
        halign: 'center',
      },
      headStyles: {
        halign: 'center'
      },
      tableWidth: 'auto',
      pageBreak: 'auto',
    });
    
    // const messages = [
    //   `Total Bruto R$ ${this.totalBruto.toLocaleString(
    //     'pt-BR',
    //     { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    //   )}`,
    //   `Total liq. atendente R$ ${this.totalLiqAtendente.toLocaleString(
    //     'pt-BR',
    //     { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    //   )}`,
    //   `Total liq. fornecedor R$ ${this.totalLiqFornecedor.toLocaleString(
    //     'pt-BR',
    //     { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    //   )} `,
    // ];

    // let messageY = doc.internal.pageSize.height - 60;

    // messages.forEach((message, index) => {
    //   const messageWidth = doc.getTextWidth(message); // Calcula a largura da mensagem
    //   const messageX = 10; // Centraliza a mensagem

    //   doc.text(message, messageX, messageY + (index * 10)); // Adiciona a mensagem com espaçamento entre elas
    // });

    doc.save('balancete.pdf');
    this.baixado.emit(false);
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
