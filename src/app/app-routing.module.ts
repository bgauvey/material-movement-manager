import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RequestComponent } from './request/request.component';
import { ReceiveComponent } from './receive/receive.component';
import { YardSheetComponent } from './yard-sheet/yard-sheet.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { PickTicketComponent } from './pick-ticket/pick-ticket.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'request', component: RequestComponent },
  { path: 'receive', component: ReceiveComponent },
  { path: 'yard-sheet', component: YardSheetComponent },
  { path: 'print',
  outlet: 'print',
  component: PrintLayoutComponent,
  children: [
    { path: 'pick-ticket/:ticketIds', component: PickTicketComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
