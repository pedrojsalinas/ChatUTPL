import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { GlosarioService } from '../services/glosario.service';
import { GlosarioTermino } from '../models/glosarioTermino';
import { CrearGlosarioTerminoService } from '../services/crear-glosario-termino.service';

@Component({
  selector: 'app-modal-agregar-glosario',
  templateUrl: './modal-agregar-glosario.component.html',
  styleUrls: ['./modal-agregar-glosario.component.css'],
})
export class ModalAgregarGlosarioComponent implements OnInit {

  private glosarioTermino: GlosarioTermino = new GlosarioTermino('', '','');

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarGlosarioComponent>,
    private glosarioService: GlosarioService,
    private crearGlosarioTerminoService: CrearGlosarioTerminoService
  ) { 
    
  }

  ngOnInit() {

  }

  crearGlosarioTermino(){
    this.glosarioTermino.chat = localStorage.getItem('idChatCreado');
    this.glosarioService.agregarTerminoGlosario(this.glosarioTermino).subscribe(
      response => {
        this.crearGlosarioTerminoService.agregarGlosarioTermino(this.glosarioTermino);
      },
      error => {
        alert("error al agregar un nuevo termino");
      }
    )
    this.cerrarVentana();
  }

  cerrarVentana() {
    this.dialogRef.close();
  }
}
