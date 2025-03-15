import { Component, Inject, OnInit } from '@angular/core';
import { ModalPagamentoAtualComponent } from '../modal-pagamento-atual/modal-pagamento-atual.component';
import { ToastrService } from 'ngx-toastr';
import { PagamentoAtualService } from '../../shared/pagamento-atual.service';
import { IDataPagamento } from '../../interface/IDataPagamento';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-relatorio-pagamento',
  templateUrl: './modal-relatorio-pagamento.component.html',
  styleUrl: './modal-relatorio-pagamento.component.css'
})
export class ModalRelatorioPagamentoComponent implements OnInit {


  loader: boolean = false;
  edit: boolean = false;

  ngOnInit(): void {
    if (this.data.pagamento.idFornecedorAtendente != 0) {
      this.edit = true;
    }
  }
  constructor(
    public dialogRef: MatDialogRef<ModalPagamentoAtualComponent>,
    private toast: ToastrService,
    private pagamentoService: PagamentoAtualService,
    @Inject(MAT_DIALOG_DATA) public data: IDataPagamento
  ) { }

  close(value: boolean = false): void {
    this.dialogRef.close(value);
  }

  onSubmit() {
    this.data.pagamento.valorBruto = Number(this.data.pagamento.valorBruto)
    if (!this.verifyFields()) {
      this.toast.error('Preencha os campos obrigatórios!');
    } else {
      if (this.edit) {
        this.atualizarPagamento();
      } else {
        this.cadastrarPagamento();
      }
    }
  }

  verifyFields() {
    if (this.data.pagamento.dataVenda == undefined ||
      this.data.pagamento.idAtendente == 0 ||
      this.data.pagamento.idFornecedor == 0 ||
      this.data.pagamento.idMetodoPagamento == 0 ||
      this.data.pagamento.idStatusPagamento == 0 ||
      this.data.pagamento.valorBruto == 0
    ) {
      return false;
    }
    return true;
  }

  cadastrarPagamento() {
    this.loader = true;
    this.pagamentoService.cadastrarPagamentoRelatorio(this.data.pagamento, {
      onSuccess: (res: any) => {
        this.toast.success('Pagamento adicionado com sucesso.');
        this.loader = false;
        this.close(true);
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
  atualizarPagamento() {
    this.loader = true;
    this.pagamentoService.atualizarPagamentoRelatorio(this.data.pagamento, {
      onSuccess: (res: any) => {
        this.toast.success('Pagamento atualizado com sucesso.');
        this.loader = false;
        this.close(true);
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
