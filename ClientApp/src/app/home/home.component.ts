import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';

import { IRequest } from '../models';
import { RequestService, PrintService } from '../services';
import { Router } from '@angular/router';

enum status {
  new = 1,
  inprocess = 2,
  waiting = 3,
  complete = 4,
  cancelled = 5
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  requests: IRequest[];
  items: MenuItem[];
  selectedRow: IRequest;

  constructor(private requestService: RequestService,
              private messageService: MessageService,
              public printService: PrintService,
              private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'View', icon: 'pi pi-eye', command: () => this.view(this.selectedRow) },
      { label: 'Print', icon: 'pi pi-print', command: () => this.print(this.selectedRow) },
      { label: 'Cancel', icon: 'pi pi-times',  command: () => this.setStatus(this.selectedRow.row_id, status.cancelled) }
  ];

    this.requestService.get().subscribe(data => this.requests = data);
  }

  fix(value: string): string {
    return value.replace(' ', '_');
  }

  print(request: IRequest) {
    const ticketIds = [request.row_id.toString()];
    this.printService.printDocument('pick-ticket', ticketIds);
    // set inprocess
    ticketIds.forEach(rowId => {
      this.setStatus(+rowId, status.inprocess);
    });
  }

  view(request: IRequest) {
    this.router.navigate(['request-details', request.row_id]);
  }

  setStatus(rowId: number, newStateCd: number) {
    this.requestService.getRequest(rowId).subscribe(data => {
        const req = data;
        const currentStateCd = req.state_cd;
        if (newStateCd === currentStateCd) {
          return;
        } else if (newStateCd < currentStateCd) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid state change' });
          return;
        } else if (currentStateCd >= status.inprocess) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'State change not allowed' });
          return;
        }
        req.state_cd = newStateCd;
        this.requestService.save(req).subscribe(
          d => {
            this.requestService.get().subscribe(r => this.requests = r);
          },
          err => {
            console.error(err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
          });
    },
    err => {
      console.error(err);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
    });
  }
}
