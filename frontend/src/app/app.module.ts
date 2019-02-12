import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditarGlosarioComponent } from './editar-glosario/editar-glosario.component';

import { DocenteService } from '../app/services/docente.service';
import { ChatService } from './services/chat.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FileSelectDirective } from 'ng2-file-upload';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { TabsRegistroComponent } from './tabs-registro/tabs-registro.component';
import { DashboardChatsComponent } from './dashboard-chats/dashboard-chats.component';
import { VentanaModalComponent } from './ventana-modal/ventana-modal.component';
import { MenuDashboardChatsDocenteComponent } from './menu-dashboard-chats-docente/menu-dashboard-chats-docente.component';
import { GlosariosComponent } from './glosarios/glosarios.component';
import { GlosarioService } from './services/glosario.service';
import { UploadsComponent } from './uploads/uploads.component';
import { ChatComponent } from './chat/chat.component';
import { MensajeComponent } from './mensaje/mensaje.component';
import { ModalAgregarGlosarioComponent } from './modal-agregar-glosario/modal-agregar-glosario.component';
import { environment } from '../environments/environment';
import { DialogUserComponent } from './componentes/dialogs/dialog-user/dialog-user.component';
const config: SocketIoConfig = { url: environment.url, options: {} };
import { MaterialModule } from './material.module';
<<<<<<< HEAD
import { AddChatComponent } from './componentes/dialogs/add-chat/add-chat.component';
import { SalaChatComponent } from './componentes/sala-chat/sala-chat.component';

=======
import { CardSalaChatComponent } from './card-sala-chat/card-sala-chat.component';
import { CrearGlosarioTerminoService } from './services/crear-glosario-termino.service';
>>>>>>> 4249b82e6e0b30e5b8642bf445f8ea3f92f6e226
@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    RegistroComponent,
    HomeComponent,
    TabsRegistroComponent,
    DashboardChatsComponent,
    VentanaModalComponent,
    MenuDashboardChatsDocenteComponent,
    GlosariosComponent,
    UploadsComponent,
    ChatComponent,
    MensajeComponent,
    ModalAgregarGlosarioComponent,
    DialogUserComponent,
<<<<<<< HEAD
    AddChatComponent,
    SalaChatComponent,

=======
    CardSalaChatComponent,
    EditarGlosarioComponent,
>>>>>>> 4249b82e6e0b30e5b8642bf445f8ea3f92f6e226
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    appRoutingProviders,
    DocenteService,
    GlosarioService,
    ChatService,
    GlosariosComponent,
    CrearGlosarioTerminoService
  ],
  entryComponents: [
    MensajeComponent,
    ModalAgregarGlosarioComponent,
    DialogUserComponent,
<<<<<<< HEAD
    AddChatComponent,
=======
    CardSalaChatComponent,
>>>>>>> 4249b82e6e0b30e5b8642bf445f8ea3f92f6e226
  ],
  bootstrap: [AppComponent],
  exports: [
    MaterialModule
  ],
})
export class AppModule { }
