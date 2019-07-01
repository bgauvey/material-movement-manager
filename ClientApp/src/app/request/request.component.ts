import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IRequest } from '../models';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestService } from '../services';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  requestForm = this.fb.group({
    item_id: ['', [Validators.required, Validators.maxLength(18)]],
    department: ['', [Validators.required]],
    req_qty: [0, [Validators.required, Validators.min(1)]],
    req_date: [new Date(), [Validators.required]],
    rework: false,
    remarks: ''
  });

  requestedBy: string;
  userDesc: string;
  request: IRequest;
  submitted: boolean;
  departments: Department[];
  department: Department;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private requestService: RequestService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.departments = [
      { name: 'Select Department', id: null },
      { name: 'Extrusion', id: 27 },
      { name: 'High Volume', id: 731 },
      { name: 'Post Plant', id: 449 },
      { name: 'Profab', id: 687 },
    ];
    this.userService.get().subscribe(user => {
      console.log(user);
      this.requestedBy = user.user_id;
      this.userDesc = user.user_desc;
    },
    err => {
      console.error(err);
    });

  }

  ngOnInit() {
  }

  onCancel() {
    let leave = true;
    if (this.requestForm.dirty) {
      leave = false;
      this.confirmationService.confirm({
        message: 'Are you sure that you want to cancel?',
        accept: () => {
          leave = true;
          this.router.navigate(['/']);
        }
      });
    }
    if (leave) { this.router.navigate(['/']); }
  }

  onSubmit() {
    this.submitted = true;
    this.request = {
      req_date_utc: this.getUtcDate(this.requestForm.controls.req_date.value),
      req_date_local: new Date(this.requestForm.controls.req_date.value),
      item_id: this.requestForm.controls.item_id.value,
      qty_req: this.requestForm.controls.req_qty.value,
      ent_id: this.requestForm.controls.department.value.id,
      remarks: this.requestForm.controls.remarks.value,
      rework: this.requestForm.controls.rework.value,
      requested_by: this.requestedBy,
      ent_name: null,
      item_desc: null,
      yard_location: null,
      last_edit_at: this.getUtcDate(new Date()),
      last_edit_by: null,
      last_edit_comment: null,
      row_id: -1,
      state_cd: 1,
      state_desc: 'NEW',
      user_desc: this.userDesc,
      uom_desc: null,
      pack_size: null
    };
    this.requestService.add(this.request).subscribe(data => {
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Material Request Submitted' });
      this.clear();
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
  }

  getUtcDate(value: Date): Date {
    return new Date(value.getUTCFullYear(),
      value.getUTCMonth(),
      value.getUTCDate(),
      value.getUTCHours(),
      value.getUTCMinutes(),
      value.getUTCSeconds()
    );
  }

  clear() {
    this.requestForm.controls.item_id.setValue('');
    this.requestForm.controls.department.setValue('');
    this.requestForm.controls.req_qty.setValue(0);
    this.requestForm.controls.req_date.setValue(new Date());
    this.requestForm.controls.rework.setValue(false);
    this.requestForm.controls.remarks.setValue('');
    this.requestForm.markAsPristine();
  }
}

interface Department {
  name: string;
  id: number;
}
