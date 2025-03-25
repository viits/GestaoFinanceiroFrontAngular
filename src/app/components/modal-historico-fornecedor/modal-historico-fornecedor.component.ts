import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IHistoricoFornecedor } from '../../interface/IHistoricoFornecedor';

@Component({
  selector: 'app-modal-historico-fornecedor',
  standalone: false,
  templateUrl: './modal-historico-fornecedor.component.html',
  styleUrl: './modal-historico-fornecedor.component.css'
})
export class ModalHistoricoFornecedorComponent implements OnInit {

  displayedColumns: string[] = [
    'nomeFornecedor',
    'porcentagem',
    'nomeUsuario',
    'dataCriacao',
  ];

  constructor(public dialogRef: MatDialogRef<ModalHistoricoFornecedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IHistoricoFornecedor[]) {

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
