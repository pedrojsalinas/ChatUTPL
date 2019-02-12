import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  titulo: string;
  mensaje: string;
}

@Component({
  selector: 'app-ventana-modal',
  templateUrl: './ventana-modal.component.html',
  styleUrls: ['./ventana-modal.component.css']

})
export class VentanaModalComponent {

  constructor(
    public dialogRef: MatDialogRef<VentanaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 

    }

  close() {
    this.dialogRef.close();
  }
}
