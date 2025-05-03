import { Component, Inject, OnInit } from '@angular/core';
import { ModalPagamentoAtualComponent } from '../modal-pagamento-atual/modal-pagamento-atual.component';
import { ToastrService } from 'ngx-toastr';
import { PagamentoAtualService } from '../../shared/pagamento-atual.service';
import { IDataPagamento } from '../../interface/IDataPagamento';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISelect } from '../../interface/ISelect';

@Component({
  selector: 'app-modal-relatorio-pagamento',
  templateUrl: './modal-relatorio-pagamento.component.html',
  styleUrl: './modal-relatorio-pagamento.component.css',
  standalone: false
})
export class ModalRelatorioPagamentoComponent implements OnInit {
  loader: boolean = false;
  edit: boolean = false;
  atendenteSelectFiltrado: ISelect[] = []

  ngOnInit(): void {
    this.FormatarValorExibicao(this.data.pagamento.valorBruto)
    let list = JSON.stringify(this.data.atendenteSelect)
    this.atendenteSelectFiltrado = JSON.parse(list)
    if (this.data.pagamento.idFornecedorAtendente != 0) {
      this.edit = true;
      const atendente = this.atendenteSelectFiltrado.filter((x: any) => x.value == this.data.pagamento.idAtendente)
      if (atendente.length > 0) {
        this.data.pagamento.nomeAtendente = atendente[0].name
      } else {
        this.data.pagamento.nomeAtendente = ''
      }
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

  verificaAtendente() {
    if (this.data.pagamento.nomeAtendente != '') {
      const nome = this.data.pagamento.nomeAtendente == undefined ? '' : this.data.pagamento.nomeAtendente.toLowerCase()
      const listAux = this.data.atendenteSelect.filter(item =>
        item.name.toLowerCase().includes(nome)
      );
      if (listAux.length > 0) {
        this.data.pagamento.idAtendente = listAux[0].value
        return true;
      } else {
        this.data.pagamento.idAtendente = 0
        return false;
      }
    }
    this.data.pagamento.idAtendente = 0
    return false
  }

  onSubmit() {
    if (!this.verificaAtendente()) {
      this.toast.error('Atendente inválido.');
      this.loader = false;
      return;
    }
    this.data.pagamento.valorBruto = Number(this.data.pagamento.valorBruto.replace(/\./g, '').replace(',', '.'))

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
  onChangeAtendente(value: any) {
    let filterValue = ''
    if (typeof value == 'string') {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value.name.toLowerCase();
    }
    this.atendenteSelectFiltrado = this.data.atendenteSelect.filter(item =>
      item.name.toLowerCase().includes(filterValue)
    );
  }
  onOptionSelected(event: any) {
    this.data.pagamento.idAtendente = event.option.value.value;
    this.data.pagamento.nomeAtendente = event.option.value.name;
  }
  displayFn(option: any): string {
    return option && option.name ? option.name : option;
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

  FormatarValorExibicao(event: any): void {

    let valor = event;
    if (typeof valor == 'number') {
      valor = valor.toLocaleString(
        'pt-BR',
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )
    }
    const v = ((valor.replace(/\D/g, '') / 100).toFixed(2) + '').split('.');
    const m = v[0].split('').reverse().join('').match(/.{1,3}/g);
    if (m != null) {


      for (let i = 0; i < m.length; i++)
        m[i] = m[i].split('').reverse().join('') + '.';

      const r = m.reverse().join('');
      this.data.pagamento.valorBruto = [r.substring(0, r.lastIndexOf('.')), ',', v[1]].join('');
    }
    else {
      this.data.pagamento.valorBruto = ''
    }

  }

}
