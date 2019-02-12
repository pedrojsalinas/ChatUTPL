import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { DocenteService } from '../services/docente.service';
import { SalaChatService } from '../services/sala-chat.service';
import { MatDialog } from '@angular/material';
import { CardSalaChatComponent } from '../card-sala-chat/card-sala-chat.component';
import { SalaChat } from '../models/salaChat'
import { Router } from "@angular/router";
@Component({
  selector: 'app-dashboard-chats',
  templateUrl: './dashboard-chats.component.html',
  styleUrls: ['./dashboard-chats.component.css']
})

export class DashboardChatsComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container;
  private nombre: string;
  private arraySalaChat: Array<SalaChat>;

  constructor(
    private docenteService: DocenteService,
    private salaChatService: SalaChatService,
    public dialog: MatDialog,
    private resolver: ComponentFactoryResolver,
    private router: Router
  ) {
    this.arraySalaChat = new Array<SalaChat>();
   }

  ngOnInit() {
    this.nombre = this.docenteService.obtenerNombresDocente() + " " + this.docenteService.ObtenerApellidosDocente();
    this.listarSalasChat();
  }

  editarGlosario(idGlosario){
    this.router.navigate(['/editarGlosario/'+idGlosario]);
  }

  listarSalasChat() {
    this.salaChatService.listarSalasChat(localStorage.getItem('idDocente')).subscribe(
      response => {
        for (let i = 0; i < response['listaSalasChat'].length; i++) {
          let salaChat = response['listaSalasChat'][i];
          let fecha = new Date(salaChat['fecha']);
          this.arraySalaChat.push(new SalaChat(salaChat['_id'], salaChat['docente'], salaChat['nombreChat'], fecha));
        }
      },
      error => {
        alert("error");
      }
    )

  }


}
