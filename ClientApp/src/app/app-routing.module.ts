import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RequestComponent } from './request/request.component';
import { ReceiveComponent } from './receive/receive.component';
import { YardComponent } from './yard/yard.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { PickTicketComponent } from './pick-ticket/pick-ticket.component';
import { RequestDetailsComponent } from './request-details/request-details.component';

const routes: Routes = [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'request', component: RequestComponent },
      { path: 'request-details/:id', component: RequestDetailsComponent },
      { path: 'receive', component: ReceiveComponent },
      { path: 'yard', component: YardComponent },
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
