import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocenteService } from '../services/docente.service';
import { Docente } from '../models/docente';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { VentanaModalComponent } from '../ventana-modal/ventana-modal.component';

@Component({
  selector: 'app-tabs-registro',
  templateUrl: './tabs-registro.component.html',
  styleUrls: ['./tabs-registro.component.css'],
  providers: [DocenteService]
})
export class TabsRegistroComponent implements OnInit {
  public docenteRegistro: Docente;
  public docenteIngreso: Docente;

  constructor(
    private docenteService: DocenteService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.docenteRegistro = new Docente('', '', '', '', '');
    this.docenteIngreso = new Docente('', '', '', '', '');
  }

  ngOnInit() {

  }

  guardarDocente(form: NgForm) {
    this.docenteService.guardarDocente(this.docenteRegistro).subscribe(
      response => {
        this.openDialog("Registro exitoso", "La informacion se ha registrado satisfactoriamente.");
        form.reset();
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  openDialog(titulo: string, mensaje: string): void {
    this.dialog.open(VentanaModalComponent, {
      data: { titulo: titulo, mensaje: mensaje }
    });
  }

  onSubmitLoginDocenteForm(formularioIngresoDocente: NgForm) {
    this.docenteIngreso = new Docente('', '', '', this.docenteIngreso.email, this.docenteIngreso.password);
    this.docenteService.consultarDocenteIngreso(this.docenteIngreso).subscribe(
      response => {
        this.docenteService.iniciarSesionDocente(response.token, response.idDocente, response.nombresDocente, response.apellidosDocente);
        this.router.navigate(['dashboardChats']);
      },
      error => {
        if (error.status === 404) {
          this.openDialog("Error", error.error.message);
          formularioIngresoDocente.reset();
        }
      }
    )
  }



}
