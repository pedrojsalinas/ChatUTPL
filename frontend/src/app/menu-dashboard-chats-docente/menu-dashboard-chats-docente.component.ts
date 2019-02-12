import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente.service';

@Component({
  selector: 'app-menu-dashboard-chats-docente',
  templateUrl: './menu-dashboard-chats-docente.component.html',
  styleUrls: ['./menu-dashboard-chats-docente.component.css']
})
export class MenuDashboardChatsDocenteComponent implements OnInit {
  
  constructor(private docenteService : DocenteService) { }

  ngOnInit() {
  }

  cerrarSesion() {
    this.docenteService.cerrarSesionDocente();
  }


}