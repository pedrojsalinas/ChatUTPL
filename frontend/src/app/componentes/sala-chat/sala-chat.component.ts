import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
//modelos
import { Message } from '../../models/message';
import { Event } from '../../models/event';
import { Action } from '../../models/action';
import { User } from '../../models/user';
//dialogs
import { DialogUserComponent } from '../../componentes/dialogs/dialog-user/dialog-user.component';
import { DialogUserType } from '../../componentes/dialogs/dialog-user/dialog-user-type';
//angular material
import { MatDialog, MatDialogRef, MatList, MatListItem } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { AddChatComponent } from '../../componentes/dialogs/add-chat/add-chat.component';
import { ActivatedRoute } from '@angular/router';


const AVATAR_URL = 'https://api.adorable.io/avatars/285';
@Component({
  selector: 'app-sala-chat',
  templateUrl: './sala-chat.component.html',
  styleUrls: ['./sala-chat.component.css']
})

export class SalaChatComponent implements OnInit, AfterViewInit {

  mensaje;
  sala
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
    public route: ActivatedRoute,
  ) {
    
  }
  
  
  ngOnInit(): void {
    this.sala = this.route.snapshot.queryParamMap.get('sala')
    this.initModel();

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

    this.ioConnection = this.chatService.getMessagesSala(this.sala)
      .subscribe((message: Message) => {
        console.log(message);
        
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

  addRoom() {
    this.dialogRoom = this.dialog.open(AddChatComponent);
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.chatService.sendMsgSala(this.sala,{
      from: this.user,
      content: message,
      sala: this.sala,
    });
    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action,
        sala: this.sala,
      }
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        },
        sala: this.sala,
      };
    }

    this.chatService.sendMsgSala(this.sala,message);
  }



}
