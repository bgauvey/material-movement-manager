import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { SpinnerModule } from 'primeng/spinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RequestComponent } from './request/request.component';
import { ReceiveComponent } from './receive/receive.component';
import { YardComponent } from './yard/yard.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { PickTicketComponent } from './pick-ticket/pick-ticket.component';
import { BarcodeListenerComponent } from './barcode-listener/barcode-listener.component';
import { RequestDetailsComponent } from './request-details/request-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RequestComponent,
    ReceiveComponent,
    YardComponent,
    PrintLayoutComponent,
    PickTicketComponent,
    BarcodeListenerComponent,
    RequestDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule, CalendarModule, CardModule, ConfirmDialogModule, ContextMenuModule,
    DialogModule, DropdownModule, InputSwitchModule, InputTextModule, MessageModule, MessagesModule,
    PanelModule, SpinnerModule, TableModule, ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
