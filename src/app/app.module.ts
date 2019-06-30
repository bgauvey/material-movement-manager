import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RequestComponent } from './request/request.component';
import { ReceiveComponent } from './receive/receive.component';
import { YardSheetComponent } from './yard-sheet/yard-sheet.component';
import { HomeComponent } from './home/home.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { PickTicketComponent } from './pick-ticket/pick-ticket.component';
import { BarcodeListenerComponent } from './barcode-listener/barcode-listener.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestComponent,
    ReceiveComponent,
    YardSheetComponent,
    HomeComponent,
    PrintLayoutComponent,
    PickTicketComponent,
    BarcodeListenerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
