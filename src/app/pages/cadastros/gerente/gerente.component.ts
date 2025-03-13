import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalGerenteComponent } from '../../../components/modal-gerente/modal-gerente.component';
import { MatDialog } from '@angular/material/dialog';
import { IPaginator } from '../../../interface/IPaginator';
import { GerenteService } from '../../../shared/gerente.service';
import { ToastrService } from 'ngx-toastr';
import { IGerente } from '../../../interface/IGerente';

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrl: './gerente.component.css'
})
export class GerenteComponent implements OnInit {
  pagination: IPaginator = {
    pageNumber: 1,
    pageSize: 8,
    qtPages: 0
  };
  displayedColumns: string[] = ['nomeGerente', 'porcentagem', 'acoes'];
  listGerente: any = []
  loader: boolean = false;
  edit: boolean = false;

  gerente: IGerente = {
    idGerente: 0,
    nomeGerente: '',
    porcentagem: 0
  }

  ngOnInit(): void {
    this.getGerente();
  }
  constructor(private router: Router,
    private dialog: MatDialog,
    private gerenteService: GerenteService,
    private toast: ToastrService) { }

  editarGerente(event: IGerente) {
    // console.log(event)
    this.gerente = event;
    this.openDialog();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(ModalGerenteComponent, {
      data: this.gerente,
      height: '30vw',
      width: '50vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.gerente = {
        idGerente: 0,
        nomeGerente: '',
        porcentagem: 0
      }
      this.getGerente();

    });
  }
  getPage(item: any) {
    this.pagination = {
      pageNumber: item.pageIndex + 1,
      pageSize: item.pageSize,
      qtPages: item.length
    }
    // console.log('Pagination: ', this.pagination)
    this.getGerente();
  }
  getGerente() {
    this.loader = true;
    this.gerenteService.getAllGerente(this.pagination, {
      onSuccess: (res: any) => {
        this.listGerente = res.data?.gerente?.listGerentes?.map((x: any) => {
          return {
            idGerente: x.idGerente,
            nomeGerente: x.nomeGerente,
            porcentagem: x.porcentagem,
          }
        });

        this.pagination = {
          pageNumber: res.data?.gerente.pageNumber,
          pageSize: res.data?.gerente?.pageSize,
          qtPages: res.data?.gerente?.qtPages
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

  public goTo(route: string) {
    this.router.navigate([route]);
  }


}
