import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmacao',
  standalone: false,
  templateUrl: './modal-confirmacao.component.html',
  styleUrl: './modal-confirmacao.component.css'
})
export class ModalConfirmacaoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit(): void {
  }

  close(value: number = 0): void {
    this.dialogRef.close(value);
  }

}
