import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../services';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  id: number;

  itemId: string;
  itemDesc: string;
  dateReq: Date;
  reqQty: number;
  requestedBy: string;
  userDesc: string;
  remarks: string;
  rework: boolean;
  department: string;
  statusDesc: string;

  constructor(activatedRoute: ActivatedRoute, private requestService: RequestService) {
    this.id = +activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.requestService.getRequest(this.id).subscribe(data => {
      this.itemId = data.item_id;
      this.itemDesc = data.item_desc;
      this.dateReq = data.req_date_local;
      this.department = data.ent_name;
      this.remarks = data.remarks;
      this.reqQty = data.qty_req;
      this.requestedBy = data.requested_by;
      this.rework = data.rework;
      this.statusDesc = data.state_desc;
      this.userDesc = data.user_desc;
    });
  }

}
