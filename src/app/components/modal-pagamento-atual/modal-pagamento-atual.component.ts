import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PagamentoAtualService } from '../../shared/pagamento-atual.service';
import { IPagamento } from '../../interface/IPagamento';

@Component({
  selector: 'app-modal-pagamento-atual',
  templateUrl: './modal-pagamento-atual.component.html',
  styleUrl: './modal-pagamento-atual.component.css'
})
export class ModalPagamentoAtualComponent implements OnInit{

  loader: boolean = false;

  ngOnInit(): void {
  }
   constructor(
      public dialogRef: MatDialogRef<ModalPagamentoAtualComponent>,
      private toast: ToastrService,
      private pagamentoService: PagamentoAtualService,
      @Inject(MAT_DIALOG_DATA) public data: IPagamento
    ) { }

    onInput(event: any) {
      // Permite apenas números inteiros
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }

    close(): void {
      this.dialogRef.close();
    }
}
