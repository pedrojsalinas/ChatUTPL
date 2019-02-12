import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit
} from '@angular/core';
import { ChatService } from '../services/chat.service';
<<<<<<< HEAD
=======
import { ActivatedRoute } from "@angular/router";
import { MensajeComponent } from '../mensaje/mensaje.component';
import { createComponent } from '@angular/compiler/src/core';
>>>>>>> 4249b82e6e0b30e5b8642bf445f8ea3f92f6e226
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
//modelos
import { Message } from '../models/message';
import { Event } from '../models/event';
import { Action } from '../models/action';
import { User } from '../models/user';
//dialogs
import { DialogUserComponent } from '../componentes/dialogs/dialog-user/dialog-user.component';
import { DialogUserType } from '../componentes/dialogs/dialog-user/dialog-user-type';
//angular material
import { MatDialog, MatDialogRef, MatList, MatListItem } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { AddChatComponent } from '../componentes/dialogs/add-chat/add-chat.component';


const AVATAR_URL = 'https://api.adorable.io/avatars/285';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, AfterViewInit {

  mensaje;
  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  dialogRef: MatDialogRef<DialogUserComponent> | null;
  dialogRoom: MatDialogRef<AddChatComponent>;


  defaultDialogUserParams: any = {
    disableClose: true,
    data: {
      title: 'Bienvenido',
      dialogType: DialogUserType.NEW
    }
  };

  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(
    private chatService: ChatService,
    public dialog: MatDialog,
    private _Activatedroute: ActivatedRoute,
  ) {

  }


  ngOnInit(): void {
    this.initModel();

    if(this._Activatedroute.snapshot.params['nombreSala']!=undefined){
      this.unirUsuarioSala(this._Activatedroute.snapshot.params['nombreSala']);
    }

    setTimeout(() => {
      this.openUserPopup(this.defaultDialogUserParams);
    }, 0);
  }

  ngAfterViewInit(): void {
    // subscribing to any changes in the list of items / messages
    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }
  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  private initModel(): void {
    const randomId = this.getRandomId();
    this.user = {
      id: randomId,
      avatar: `${AVATAR_URL}/${randomId}.png`
    };
  }
  private initIoConnection(): void {

    this.ioConnection = this.chatService.getMessages()
      .subscribe((message: Message) => {
        this.messages.push(message);

      });


    this.chatService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.chatService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }

  public onClickUserInfo() {
    this.openUserPopup({
      data: {
        username: this.user.name,
        title: 'Editar Detalles',
        dialogType: DialogUserType.EDIT
      }
    });
  }

  private openUserPopup(params): void {
    this.dialogRef = this.dialog.open(DialogUserComponent, params);
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) {
        return;
      }

      this.user.name = paramsDialog.username;
      if (paramsDialog.dialogType === DialogUserType.NEW) {
        this.initIoConnection();
        this.sendNotification(paramsDialog, Action.JOINED);
      } else if (paramsDialog.dialogType === DialogUserType.EDIT) {
        this.sendNotification(paramsDialog, Action.RENAME);
      }
    });
  }

  addRoom(){
    this.dialogRoom = this.dialog.open(AddChatComponent);
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.chatService.send({
      from: this.user,
      content: message
    });
    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      }
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.chatService.send(message);
  }

  unirUsuarioSala(nombreSala: String) {
    this.chatService.unirUsuarioSala(nombreSala);
  }



}
