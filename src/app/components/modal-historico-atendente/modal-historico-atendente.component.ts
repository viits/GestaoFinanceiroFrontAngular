import { Component, Inject, OnInit } from '@angular/core';
import { IHistoricoAtendente } from '../../interface/IHistoricoAtendente';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-historico-atendente',
  standalone: false,
  templateUrl: './modal-historico-atendente.component.html',
  styleUrl: './modal-historico-atendente.component.css'
})
export class ModalHistoricoAtendenteComponent implements OnInit {

  displayedColumns: string[] = [
    'nomeAtendente',
    'porcentagem',
    'nomeUsuarioGerente',
    'nomeUsuario',
    'dataCriacao',
  ];

  ngOnInit(): void {
  }
  constructor(
    public dialogRef: MatDialogRef<ModalHistoricoAtendenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IHistoricoAtendente[]
  ){
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
