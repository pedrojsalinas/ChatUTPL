import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { SalaChat } from '../models/salaChat';
import { GlosarioTermino } from '../models/glosarioTermino';

@Injectable({
    providedIn: 'root'
})
export class GlosarioService {

    private url: string;

    constructor(
        private _http: HttpClient,
        private router: Router
    ) {
        this.url = environment.url
    }

    guardarSalaChat(chat: SalaChat): Observable<any> {
        let params = JSON.stringify(chat);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + '/api/salaChat/guardarSalaChat', params, { headers: headers });
    }

    actualizarSalaChat(chat: SalaChat): Observable<any> {
        let params = JSON.stringify(chat);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + '/api/salaChat/actualizarSalaChat', params, { headers: headers });
    }

    agregarTerminoGlosario(glosarioTermino: GlosarioTermino): Observable<any> {
        let params = JSON.stringify(glosarioTermino);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + '/api/glosario/agregarTerminoGlosario', params, { headers: headers });
    }

    listarTerminosGlosario(glosarioTermino: GlosarioTermino): Observable<any> {
        let params = JSON.stringify(glosarioTermino);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + '/api/glosario/listarTerminosGlosario', params, { headers: headers });
    }

    eliminarTerminoGlosario(idTermino): Observable<any> {
        let glosarioInfo = {'_id':idTermino};
        alert(idTermino);
        let params = JSON.stringify(glosarioInfo);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + '/api/glosario/eliminarTerminoGlosario', params, { headers: headers });
    }


}
