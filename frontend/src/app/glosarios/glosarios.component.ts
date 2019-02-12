import { Component, OnInit } from '@angular/core';
import { ModalAgregarGlosarioComponent } from '../modal-agregar-glosario/modal-agregar-glosario.component'
import { MatDialog } from '@angular/material';
import { SalaChat } from '../models/salaChat';
import { GlosarioService } from '../services/glosario.service';
import { Router } from "@angular/router";
import { GlosarioTermino } from '../models/glosarioTermino';

@Component({
  selector: 'app-glosarios',
  templateUrl: './glosarios.component.html',
  styleUrls: ['./glosarios.component.css'],
})
export class GlosariosComponent implements OnInit {

  private nombreChat: String;
  private chat: SalaChat;
  private glosarioTermino: GlosarioTermino;
  private arrayGlosarioTermino: Array <GlosarioTermino> = new Array <GlosarioTermino>() ; 

  constructor(
    public dialog: MatDialog,
    private glosarioService: GlosarioService,
    private router: Router
  ) {
    this.chat = new SalaChat('', '');
    this.glosarioTermino = new GlosarioTermino('', '', '');
  }

  ngOnInit() {
    this.chat.docente = localStorage.getItem('idDocente');
    this.glosarioService.guardarSalaChat(this.chat).subscribe(
      response => {
        localStorage.setItem('idChatCreado', response['chatAlmacenado']['_id']);
      },
      error => {
        alert("error");
      }
    )
  }

  modal(): void {
    this.dialog.open(ModalAgregarGlosarioComponent, {
      height: '280px',
      width: '400px',
    });
  }

  actualizarSalaChat() {
    this.chat.docente = localStorage.getItem('idDocente');
    this.chat._id = localStorage.getItem('idChatCreado');
    this.glosarioService.actualizarSalaChat(this.chat).subscribe(
      response => {
      },
      error => {
        console.log(<any>error);
      }
    )
    this.router.navigate(['/chat']);
  }

}
