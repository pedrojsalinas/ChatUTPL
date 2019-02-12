import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Docente } from '../models/docente';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class DocenteService {
    private url: string;

    constructor(
        private _http: HttpClient,
        private router : Router
    ) {
        this.url = environment.url+'/api/'
    }

    guardarDocente(docente: Docente): Observable<any> {
        let params = JSON.stringify(docente);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'guardarDocente', params, { headers: headers });
    }

    consultarDocenteIngreso(docente: Docente): Observable<any> {
        let params = JSON.stringify(docente);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'consultarDocenteIngreso', params, { headers });
    }

    obtenerToken(){
        return localStorage.getItem('token');
    }

    obtenerIdDocente(){
        return localStorage.getItem('idDocente');
    }

    obtenerNombresDocente(){
        return localStorage.getItem('nombresDocente');
    }

    ObtenerApellidosDocente(){
        return localStorage.getItem('apellidosDocente');
    }

    obtenerPerfil() {
        const headers = new HttpHeaders({
            'authorization': this.obtenerToken(),
            'idDocente': this.obtenerIdDocente(),
            'Content-Type': 'application/json'
        });
        return this._http.post(this.url + 'obtenerPerfil', null, { headers: headers });
    }

    iniciarSesionDocente(token: string, idDocente: string, nombresDocente: string, apellidosDocente: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('idDocente', idDocente);
        localStorage.setItem('nombresDocente', nombresDocente);
        localStorage.setItem('apellidosDocente', apellidosDocente);
    }

    cerrarSesionDocente() {
        localStorage.clear();
        this.router.navigateByUrl('/');
    }

    obtenerPayload() {
        var token = this.obtenerToken();
        if (token) {
            var payload = atob(token.split('.')[1]);
            return JSON.parse(payload);
        }
        else
            return null;
    }

    haIniciadoSesion() {
        var payload = this.obtenerPayload();
        if (payload)
            return payload.exp > Date.now() / 1000;
        else
            return false;
    }
}
