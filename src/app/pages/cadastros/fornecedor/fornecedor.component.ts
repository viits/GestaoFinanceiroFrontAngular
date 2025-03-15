import { Component, OnInit } from '@angular/core';
import { IPaginator } from '../../../interface/IPaginator';
import { IFornecedor } from '../../../interface/IFornecedor';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FornecedorService } from '../../../shared/fornecedor.service';
import { ToastrService } from 'ngx-toastr';
import { ModalFornecedorComponent } from '../../../components/modal-fornecedor/modal-fornecedor.component';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.css'
})
export class FornecedorComponent implements OnInit {

  pagination: IPaginator = {
    pageNumber: 1,
    pageSize: 5,
    qtPages: 0
  };
  displayedColumns: string[] = ['nomeFornecedor', 'porcentagem', 'acoes'];
  listFornecedor: any = []
  loader: boolean = false;
  edit: boolean = false;

  fornecedor: IFornecedor = {
    idFornecedor: 0,
    nomeFornecedor: '',
    porcentagem: 0
  }

  ngOnInit(): void {
    this.getFornecedor();
  }
  constructor(private router: Router,
    private dialog: MatDialog,
    private fornecedorService: FornecedorService,
    private toast: ToastrService) { }

  editarFornecedor(event: IFornecedor) {
    // console.log(event)
    this.fornecedor = event;
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalFornecedorComponent, {
      data: this.fornecedor,
      height: '30vw',
      width: '50vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.fornecedor = {
        idFornecedor: 0,
        nomeFornecedor: '',
        porcentagem: 0
      }
      if (result == true) {
        this.getFornecedor();
      }
    });
  }

  getPage(item: any) {
    this.pagination = {
      pageNumber: item.pageIndex + 1,
      pageSize: item.pageSize,
      qtPages: item.length
    }
    // console.log('Pagination: ', this.pagination)
    this.getFornecedor();
  }

  getFornecedor() {
    this.loader = true;
    this.fornecedorService.getAllFornecedor(this.pagination, {
      onSuccess: (res: any) => {
        this.listFornecedor = res.data?.fornecedor?.listFornecedores?.map((x: any) => {
          return {
            idFornecedor: x.idFornecedor,
            nomeFornecedor: x.nomeFornecedor,
            porcentagem: x.porcentagem,
          }
        });

        this.pagination = {
          pageNumber: res.data?.fornecedor.pageNumber,
          pageSize: res.data?.fornecedor?.pageSize,
          qtPages: res.data?.fornecedor?.qtPages
        };
        this.loader = false;
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
