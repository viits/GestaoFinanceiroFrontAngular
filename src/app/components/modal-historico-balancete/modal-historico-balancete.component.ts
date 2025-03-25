import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IHistoricoBalancete } from '../../interface/IHistoricoBalancete';

@Component({
  selector: 'app-modal-historico-balancete',
  standalone: false,
  templateUrl: './modal-historico-balancete.component.html',
  styleUrl: './modal-historico-balancete.component.css'
})
export class ModalHistoricoBalanceteComponent implements OnInit {
  displayedColumns: string[] = [
    'nomeAtendente',
    'nomeFornecedor',
    'metodoPagamento',
    'statusPagamento',
    'valorBruto',
    'valorLiquidoAtendente',
    'valorLiquidoFornecedor',
    'dataVenda',
    'dataCriacao',
    'nomeUsuario'
  ];

  constructor(public dialogRef: MatDialogRef<ModalHistoricoBalanceteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IHistoricoBalancete[]) {
  }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
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
