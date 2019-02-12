import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SalaChatService {
  
  private url: string;
  
  constructor(
    private _http: HttpClient,
    private router: Router
  ) {
    this.url = environment.url+'/api/salaChat'
  }

  guardar(idUsuario, idChat): Observable<any> {
    let infoSala = { 'idUsuario': idUsuario, 'idChat': idChat };
    let params = JSON.stringify(infoSala);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + '/guardar', params, { headers: headers });
  }

  listarSalasChat(idDocente): Observable<any> {
    let infoDocente = {'docente': idDocente};
    let params = JSON.stringify(infoDocente);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + '/listarSalasChat', params, { headers: headers });
  }

  obtenerNombreSalaChat(idChat): Observable<any> {
    let infoChat = {'idChat': idChat};
    let params = JSON.stringify(infoChat);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + '/obtenerNombreSalaChat', params, { headers: headers });
  }
}
