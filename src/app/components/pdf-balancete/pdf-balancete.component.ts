import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPagamentoTable } from '../../interface/IPagamentoTable';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-pdf-balancete',
    templateUrl: './pdf-balancete.component.html',
    styleUrl: './pdf-balancete.component.css',
    standalone: false
})
export class PdfBalanceteComponent implements OnInit {

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
  @Input() listPagamentos: IPagamentoTable[] = [];

  @Input() totalBruto: number = 0;
  @Input() totalLiqAtendente: number = 0;
  @Input() totalLiqFornecedor: number = 0;
  @Output() baixado = new EventEmitter();
  ngOnInit(): void {
    this.gerarPDF();
    this.baixado.emit(false);
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
