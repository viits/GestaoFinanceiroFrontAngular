import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PagamentoAtualService } from '../../shared/pagamento-atual.service';
import { IPagamento } from '../../interface/IPagamento';
import { IDataPagamento } from '../../interface/IDataPagamento';

@Component({
  selector: 'app-modal-pagamento-atual',
  templateUrl: './modal-pagamento-atual.component.html',
  styleUrl: './modal-pagamento-atual.component.css'
})
export class ModalPagamentoAtualComponent implements OnInit {

  loader: boolean = false;

  ngOnInit(): void {
  }
  constructor(
    public dialogRef: MatDialogRef<ModalPagamentoAtualComponent>,
    private toast: ToastrService,
    private pagamentoService: PagamentoAtualService,
    @Inject(MAT_DIALOG_DATA) public data: IDataPagamento
  ) { }


  close(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // if (!this.verifyFields()) {
    //   this.toast.error('Preencha os campos obrigatórios!');
    //   this.loader = false;
    //   return;
    // }
    this.data.pagamento.valorBruto = Number(this.data.pagamento.valorBruto)

    this.cadastrarPagamento();

  }
  cadastrarPagamento(){
    this.loader = true;
    this.pagamentoService.cadastrarPagamento(this.data.pagamento, {
      onSuccess: (res: any) => {
        this.toast.success('Pagamento adicionado com sucesso.');
        this.loader = false;
        this.close();
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
      },
    });
  }

}
