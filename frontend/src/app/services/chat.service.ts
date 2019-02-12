import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Message } from '../models/message';
import { Event } from '../models/event';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private url: string;

  constructor(
    private socket: Socket,
    private http: HttpClient,
    private router: Router,
    ) {}

  nuevaSala(nombre) {
    const randomId = this.getRandomId();
    // let params={
    //   'id': randomId,
    //   'nombre':nombre,
    // }
    this.socket.emit('nuevoRoom', nombre);
    this.router.navigate(['chat/' + randomId], {queryParams:{ sala: nombre}})
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }
  getMessages(): Observable<Message> {
    return this.socket
      .fromEvent<Message>('message').pipe(
        map(data => data)
      )
  }
  getMessagesSala(sala): Observable<Message> {
    
    return this.socket
      .fromEvent<Message>('mensaje').pipe(
        map(data => data)
      )
  }
 
  public send(message: Message): void {
    this.socket.emit('message', message);
  }
  public sendMsgSala(sala,message: Message): void {
    let obj={
      'sala':sala,
      'message': message
    }
    this.socket.emit('mensaje', obj);
  }

  public unirUsuarioSala(nombreSala: String): void {
    this.socket.emit('unirUsuarioSala', nombreSala);
  }

  public onMessage(): Observable<Message> {

    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => {observer.next(data)
        console.log(data);
      }
      );
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

}
