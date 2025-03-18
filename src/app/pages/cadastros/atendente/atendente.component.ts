import { Component, OnInit } from '@angular/core';
import { IPaginator } from '../../../interface/IPaginator';
import { IFornecedor } from '../../../interface/IFornecedor';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FornecedorService } from '../../../shared/fornecedor.service';
import { ToastrService } from 'ngx-toastr';
import { ModalAtendenteComponent } from '../../../components/modal-atendente/modal-atendente.component';
import { IAtendente } from '../../../interface/IAtendente';
import { AtendenteService } from '../../../shared/atendente.service';

@Component({
  selector: 'app-atendente',
  templateUrl: './atendente.component.html',
  styleUrl: './atendente.component.css'
})
export class AtendenteComponent implements OnInit {


  pagination: IPaginator = {
    pageNumber: 1,
    pageSize: 5,
    qtPages: 0
  };
  displayedColumns: string[] = ['nomeAtendente', 'porcentagem', 'acoes'];
  listAtendente: IAtendente[] = []
  loader: boolean = false;
  edit: boolean = false;

  atendente: IAtendente = {
    idAtendente: 0,
    idGerente: 0,
    nomeAtendente: '',
    porcentagem: 0
  }
  larguraTela: number = 0;
  ngOnInit(): void {
    this.larguraTela = window.innerWidth;
    this.getAtendente();
  }
  constructor(private router: Router,
    private dialog: MatDialog,
    private atendenteService: AtendenteService,
    private toast: ToastrService) { }

  editarFornecedor(event: IAtendente) {
    // console.log(event)
    this.atendente = event;
    this.openDialog();
  }

  openDialog(): void {
    let larguraDialog = '50vw';
    let alturaDialog = '30vh';
    if (this.larguraTela < 940) {
      larguraDialog = '90vw';
      alturaDialog = '80vh';
    }
    const dialogRef = this.dialog.open(ModalAtendenteComponent, {
      data: this.atendente,
      height: alturaDialog,
      width: larguraDialog
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.atendente = {
        idAtendente: 0,
        idGerente: 0,
        nomeAtendente: '',
        porcentagem: 0
      }
      if (result == true) {
        this.getAtendente();
      }
    });
  }

  getPage(item: any) {
    this.pagination = {
      pageNumber: item.pageIndex + 1,
      pageSize: item.pageSize,
      qtPages: item.length
    }
    this.getAtendente();
  }

  getAtendente() {
    this.loader = true;
    this.atendenteService.getAllAtendente(this.pagination, {
      onSuccess: (res: any) => {
        this.listAtendente = res.data?.atendente?.listAtendentes?.map((x: any) => {
          return {
            idAtendente: x.idAtendente,
            idGerente: x.idGerente,
            nomeAtendente: x.nomeAtendente,
            porcentagem: x.porcentagem,
          }
        });

        this.pagination = {
          pageNumber: res.data?.atendente.pageNumber,
          pageSize: res.data?.atendente?.pageSize,
          qtPages: res.data?.atendente?.qtPages
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
