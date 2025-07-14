import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PagamentoAtualService } from '../../shared/pagamento-atual.service';
import { IPagamento } from '../../interface/IPagamento';
import { IDataPagamento } from '../../interface/IDataPagamento';
import { ISelect } from '../../interface/ISelect';

@Component({
  selector: 'app-modal-pagamento-atual',
  templateUrl: './modal-pagamento-atual.component.html',
  styleUrl: './modal-pagamento-atual.component.css',
  standalone: false
})
export class ModalPagamentoAtualComponent implements OnInit {

  loader: boolean = false;
  atendenteSelectFiltrado: ISelect[] = []
  atendenteSelectFiltrado2: ISelect[] = []
  ngOnInit(): void {
    let list = JSON.stringify(this.data.atendenteSelect)
    this.atendenteSelectFiltrado = JSON.parse(list)
    this.atendenteSelectFiltrado2 = JSON.parse(list)
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
  FormatarValorExibicao(event: any): void {
    let valor = event;
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
  
  verifyFields() {
    if (this.data.pagamento.idFornecedor == 0 || this.data.pagamento.idMetodoPagamento == 0 || this.data.pagamento.valorBruto == 0) {
      return false
    }
    return true
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
    if (!this.verifyFields()) {
      this.toast.error('Preencha os campos obrigatórios!');
      this.loader = false;
      return;
    }
    this.data.pagamento.valorBruto = Number(this.data.pagamento.valorBruto.replace(/\./g, '').replace(',', '.'))

    this.cadastrarPagamento();
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

  onChangeAtendente2(value: any) {
    let filterValue = ''
    if (typeof value == 'string') {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value.name.toLowerCase();
    }
    this.atendenteSelectFiltrado2 = this.data.atendenteSelect.filter(item =>
      item.name.toLowerCase().includes(filterValue)
    );
  }

  onOptionSelected(event: any) {
    this.data.pagamento.idAtendente = event.option.value.value;
    this.data.pagamento.nomeAtendente = event.option.value.name;
  }

  onOptionSelectedAtendente2(event: any) {
    this.data.pagamento.idAtendente2 = event.option.value.value;
    this.data.pagamento.nomeAtendente2 = event.option.value.name;
  }

  displayFn(option: any): string {
    return option && option.name ? option.name : option;
  }

  cadastrarPagamento() {
    this.loader = true;
    this.pagamentoService.cadastrarPagamento(this.data.pagamento, {
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

}
