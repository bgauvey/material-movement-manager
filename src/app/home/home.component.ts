import { Component, OnInit } from '@angular/core';
import { IRequest } from '../models';

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
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  requests: IRequest[];

  constructor() { }

  ngOnInit() {
    this.requests = [
      {
        req_date_local: new Date('6/28/2019 14:23'),
        req_date_utc: new Date(new Date('6/28/2019 14:23').toUTCString()),
        item_id: '61102418',
        item_desc: 'MATERIAL TO REGRIND',
        qty_req: 1,
        ent_id: 1,
        ent_name: 'Extrusion',
        state_cd: 1,
        state_desc: 'NEW',
        remarks: null,
        rework: false,
        requested_by: 'bgauvey',
        user_desc: 'Bill Gauvey',
        uom_desc: 'BDL',
        pack_size: 1,
        yard_location: 'W B-23-25',
        last_edit_comment: null,
        last_edit_by: null,
        last_edit_at: null,
        row_id: 1
      },
      {
        req_date_local: new Date('6/28/2019 14:23'),
        req_date_utc: new Date(new Date('6/28/2019 14:23').toUTCString()),
        item_id: '73010804',
        item_desc: '6\'x8\' Dogwood Haven Series',
        qty_req: 1,
        ent_id: 1,
        ent_name: 'High Volume',
        state_cd: 2,
        state_desc: 'IN PROCESS',
        remarks: null,
        rework: false,
        requested_by: 'bgauvey',
        user_desc: 'Bill Gauvey',
        uom_desc: 'BDL',
        pack_size: 1,
        yard_location: 'W A-10',
        last_edit_comment: null,
        last_edit_by: null,
        last_edit_at: null,
        row_id: 2
      }
    ];
  }

  fix(value: string): string {
    return value.replace(' ', '_').toUpperCase();
  }

}
