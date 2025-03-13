import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FornecedorService } from '../../shared/fornecedor.service';
import { IFornecedor } from '../../interface/IFornecedor';
import { GerenteService } from '../../shared/gerente.service';
import { ISelect } from '../../interface/ISelect';
import { IAtendente } from '../../interface/IAtendente';
import { AtendenteService } from '../../shared/atendente.service';

@Component({
  selector: 'app-modal-atendente',
  templateUrl: './modal-atendente.component.html',
  styleUrl: './modal-atendente.component.css'
})
export class ModalAtendenteComponent implements OnInit {
  listGerente: ISelect[] = [{
    value: 0,
    name: 'Não possui gerente'
  }]
  loader: boolean = false;
  edit: boolean = false;
  atendente: IAtendente = {
    idAtendente: 0,
    idGerente: 0,
    nomeAtendente: '',
    porcentagem: 0
  }

  constructor(
    public dialogRef: MatDialogRef<ModalAtendenteComponent>,
    private toast: ToastrService,
    private atendenteService: AtendenteService,
    private gerenteService: GerenteService,
    @Inject(MAT_DIALOG_DATA) public data: IAtendente
  ) { }

  ngOnInit(): void {
    this.getGeretente();
    if (this.data.idAtendente != 0) {
      this.edit = true;
    }
  }
  getGeretente() {
    this.loader = true;
    this.gerenteService.getAllGerenteSelect({
      onSuccess: (res: any) => {
        res.data.listGerente?.map((x: any) => {
          this.listGerente.push({
            value: x.idGerente,
            name: x.nomeGerente
          });
        });
        this.loader = false;
      },
      onError: (error: any) => {
        if (error.status != 400) {
          this.toast.error('Ocorreu um erro, tente novamente mais tarde!');
        } else {
          error.error.errors?.map((x: any) => {
            this.toast.error(x);
          });
        }
        this.loader = false;
      },
    });
  }
  onInput(event: any) {
    // Permite apenas números inteiros
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  }

  close(): void {
    this.dialogRef.close();
  }
  verifyFields() {
    if (this.data.nomeAtendente == '' || this.data.porcentagem == 0 || this.data.porcentagem == null) {
      return false;
    }
    return true;
  }
  cadastrarAtendente() {
    this.loader = true;
    this.atendenteService.cadastrarAtendente(this.data, {
      onSuccess: (res: any) => {
        this.toast.success('Cadastrado com sucesso.');
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
  editarAtendente() {
    this.loader = true;
    this.atendenteService.editarAtendente(this.data, {
      onSuccess: (res: any) => {
        this.toast.success('Atualizado com sucesso.');
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
  onSubmit() {
    if (!this.verifyFields()) {
      this.toast.error('Preencha os campos obrigatórios!');
      this.loader = false;
      return;
    }
    this.data.porcentagem = Number(this.data.porcentagem)
    if (this.edit == true) {
      this.editarAtendente();
    }
    else {
      this.cadastrarAtendente();
    }
  }

}
