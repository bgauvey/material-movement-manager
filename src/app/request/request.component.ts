import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RequestService } from '../services';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { IUser } from '../models';

interface Department {
  name: string;
  id: number;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  prompt: boolean;
  departments: Department[];
  user: IUser;
  requestForm = new FormGroup({
    item_id: new FormControl('', Validators.required),
    ent_id: new FormControl('', Validators.required),
    qty_req: new FormControl(0, [Validators.required, Validators.min(1)]),
    rework: new FormControl('false'),
    remarks: new FormControl('')
  });

  constructor(private requestService: RequestService,
              private userService: UserService,
              private router: Router
    ) {
      /*
      this.userService.get().subscribe(user => {
        this.user = user;
      },
      err => {
        console.error(err);
      });
      */
    }

  ngOnInit() {
    this.requestForm.controls.rework.setValue(false);
    this.departments = [
      { name: 'Select Department', id: null },
      { name: 'Extrusion', id: 27 },
      { name: 'High Volume', id: 731 },
      { name: 'Post Plant', id: 449 },
      { name: 'Profab', id: 687 },
    ];
  }

  onSubmit() {
    this.requestService.add({
      item_id: this.requestForm.controls.item_id.value,
      rework: this.requestForm.controls.rework.value,
      qty_req: +this.requestForm.controls.qty_req.value,
      remarks: this.requestForm.controls.remarks.value,
      req_date_local: new Date(),
      ent_id: +this.requestForm.controls.ent_id.value,
      req_date_utc: null,
      ent_name: null,
      last_edit_at: null,
      last_edit_by: null,
      last_edit_comment: null,
      pack_size: null,
      requested_by: '',
      item_desc: null,
      row_id: null,
      state_cd: null,
      state_desc: null,
      uom_desc: null,
      user_desc: null,
      yard_location: null
    });
  }

  onCancel() {
    let leave = false;
    this.prompt = false;
    if (this.requestForm.pristine) {
        leave = true;
    } else {
      this.prompt = true;
    }
    if (leave) {
      this.router.navigate(['home']);
    }
  }
}
