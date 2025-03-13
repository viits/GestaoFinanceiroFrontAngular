import { Component, OnInit } from '@angular/core';
import { PagamentoAtualService } from '../../shared/pagamento-atual.service';
import { ToastrService } from 'ngx-toastr';
import { IPagamentoTable } from '../../interface/IPagamentoTable';
import { IPagamento } from '../../interface/IPagamento';
import { MatDialog } from '@angular/material/dialog';
import { ModalPagamentoAtualComponent } from '../../components/modal-pagamento-atual/modal-pagamento-atual.component';

@Component({
  selector: 'app-pagamento-atual',
  templateUrl: './pagamento-atual.component.html',
  styleUrl: './pagamento-atual.component.css'
})
export class PagamentoAtualComponent implements OnInit {
  loader: boolean = false;
  listPagamentos: IPagamentoTable[] = []
  pagamento: IPagamento = {
    idFornecedorAtendente: 0,
    idAtendente: 0,
    idFornecedor: 0,
    idMetodoPagamento: 0,
    idStatusPagamento: 0,
    valorBruto: 0,
  }
  displayedColumns: string[] = ['nomeAtendente', 'nomeFornecedor', 'valorBruto', 'metodoPagamento', 'statusPagamento'];

  ngOnInit(): void {
    this.getPagamentoAtual();
  }
  constructor(private pagamentoService: PagamentoAtualService, private toast: ToastrService, private dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalPagamentoAtualComponent, {
      data: this.pagamento,
      height: '30vw',
      width: '50vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.pagamento = {
        idFornecedorAtendente: 0,
        idAtendente: 0,
        idFornecedor: 0,
        idMetodoPagamento: 0,
        idStatusPagamento: 0,
        valorBruto: 0,
      }
      this.getPagamentoAtual();
    });
  }

  getPagamentoAtual() {
    this.loader = true;
    this.pagamentoService.getAllPagamentoAtual({
      onSuccess: (res: any) => {
        console.log('Res: ', res.data)
        // this.loader = false;
      },
      onError: (error: any) => {
        this.loader = false;
        if (error.status != 400) {
          this.toast.error('Ocorreu um erro, tente novamente mais tarde!');
        } else {
          error.error.errors?.map((x: any) => {
            this.toast.error(x);
          });
          // this.toast.error('Email ou senha inválidos!');
        }
        this.loader = false;
      },
    });
  }

}
