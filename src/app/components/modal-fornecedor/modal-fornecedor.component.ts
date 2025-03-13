import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GerenteService } from '../../shared/gerente.service';
import { IGerente } from '../../interface/IGerente';
import { IFornecedor } from '../../interface/IFornecedor';
import { FornecedorService } from '../../shared/fornecedor.service';

@Component({
  selector: 'app-modal-fornecedor',
  templateUrl: './modal-fornecedor.component.html',
  styleUrl: './modal-fornecedor.component.css'
})
export class ModalFornecedorComponent implements OnInit {
  loader: boolean = false;
  edit: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ModalFornecedorComponent>,
    private toast: ToastrService,
    private fornecedorService: FornecedorService,
    @Inject(MAT_DIALOG_DATA) public data: IFornecedor
  ) { }

  ngOnInit(): void {
    if(this.data.idFornecedor != 0){
      this.edit = true;
    }
  }

  onInput(event: any) {
    // Permite apenas números inteiros
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  }

  close(): void {
    this.dialogRef.close();
  }
  verifyFields() {
    if (this.data.nomeFornecedor == '' || this.data.porcentagem == 0 || this.data.porcentagem == null) {
      return false;
    }
    return true;
  }
  cadastrarFornecedor(){
    this.loader = true;
    this.fornecedorService.cadastrarFornecedor(this.data, {
      onSuccess: (res: any) => {
        this.toast.success('Fornecedor cadastrado com sucesso.');
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
  editarFornecedor(){
    this.loader = true;
    this.fornecedorService.editarFornecedor(this.data, {
      onSuccess: (res: any) => {
        this.toast.success('Fornecedor editado com sucesso.');
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
    if(this.edit == true){
      this.editarFornecedor();
    }
    else{
      this.cadastrarFornecedor();
    }
  }


}
