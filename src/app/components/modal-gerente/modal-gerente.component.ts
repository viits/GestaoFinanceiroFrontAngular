import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GerenteService } from '../../shared/gerente.service';
import { IGerente } from '../../interface/IGerente';

@Component({
  selector: 'app-modal-gerente',
  templateUrl: './modal-gerente.component.html',
  styleUrl: './modal-gerente.component.css'
})
export class ModalGerenteComponent implements OnInit {
  loader: boolean = false;
  edit: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ModalGerenteComponent>,
    private toast: ToastrService,
    private gerenteService: GerenteService,
    @Inject(MAT_DIALOG_DATA) public data: IGerente
  ) { }

  ngOnInit(): void {
    if(this.data.idGerente != 0){
      this.edit = true;
    }
  }

  close(value: boolean = false): void {
    this.dialogRef.close(value);
  }
  verifyFields() {
    if (this.data.nomeGerente == '' || this.data.porcentagem == 0 || this.data.porcentagem == null) {
      return false;
    }
    return true;
  }
  cadastrarGerente(){
    this.loader = true;
    this.gerenteService.cadastrarGerente(this.data, {
      onSuccess: (res: any) => {
        this.toast.success('Gerente cadastrado com sucesso.');
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
  editarGerente(){
    this.loader = true;
    this.gerenteService.editarGerente(this.data, {
      onSuccess: (res: any) => {
        this.toast.success('Gerente editado com sucesso.');
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
  onSubmit() {
    if (!this.verifyFields()) {
      this.toast.error('Preencha os campos obrigatórios!');
      this.loader = false;
      return;
    }
    this.data.porcentagem = Number(this.data.porcentagem)
    if(this.edit == true){
      this.editarGerente();
    }
    else{
      this.cadastrarGerente();
    }
  }

}
