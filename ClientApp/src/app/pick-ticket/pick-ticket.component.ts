import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintService, RequestService } from '../services';

@Component({
  selector: 'app-pick-ticket',
  templateUrl: './pick-ticket.component.html',
  styleUrls: ['./pick-ticket.component.css']
})
export class PickTicketComponent implements OnInit {
  ticketIds: string[];
  ticketDetails: Promise<any>[];

  constructor(route: ActivatedRoute,
              private printService: PrintService,
              private requestService: RequestService) {
    this.ticketIds = route.snapshot.params.ticketIds.split(',');
  }

  ngOnInit() {
    this.ticketDetails = this.ticketIds
    .map(id => this.getTicketDetails(id));
    Promise.all(this.ticketDetails)
    .then(() => this.printService.onDataReady());
}

  getTicketDetails(ticketId) {
    const promise = new Promise((resolve, reject) => {
        this.requestService.getRequest(ticketId)
        .toPromise()
        .then(data => { // Success
          console.log(data);
          setTimeout(() => resolve(data), 1000);
        },
        err => { // Error
          console.error(err);
        }
      );
    });
    return promise;
  }
}
