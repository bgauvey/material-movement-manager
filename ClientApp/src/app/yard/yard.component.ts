import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { IYardLocation } from '../models';
import { YardLocationsService } from '../services';

@Component({
  selector: 'app-yard',
  templateUrl: './yard.component.html',
  styleUrls: ['./yard.component.css']
})
export class YardComponent implements OnInit {
  newLocation: boolean;
  displayDialog: boolean;
  yardlocation: IYardLocation = {
    row_id: null,
    item_id: null,
    last_edit_at: null,
    last_edit_by: null,
    last_edit_comment: null,
    location_text: null
  };
  selectedLocation: IYardLocation;
  yardlocations;
  cols: any[];

  constructor(private service: YardLocationsService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.cols = [
      { field: 'item_id', header: 'Material' },
      { field: 'location_text', header: 'Location' },
      { field: 'last_edit_comment', header: 'Comments' }
    ];

    this.service.get().subscribe(data => {
      this.yardlocations = data;
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
  }


  save() {
    const yardlocations = [...this.yardlocations];
    const yardlocation = this.yardlocation;
    if (this.newLocation) {
      this.service.add(this.yardlocation).subscribe(data => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Record Created Successfully' });
        yardlocations.push(yardlocation);
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
      });
    } else {
      this.service.save(this.yardlocation).subscribe(data => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Record Updated Successfully' });
        yardlocations[this.yardlocations.indexOf(this.selectedLocation)] = yardlocation;
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
      });
    }
    this.yardlocations = yardlocations;
    this.yardlocation = null;
    this.displayDialog = false;
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this record?',
      accept: () => {
        this.service.delete(this.yardlocation).subscribe(data => {
          this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Record Removed Successfully' });
          const index = this.yardlocations.indexOf(this.selectedLocation);
          this.yardlocations = this.yardlocations.filter((val, i) => i != index);
        }, err => {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
        });
        this.yardlocation = null;
        this.displayDialog = false;
      }
    });

  }

  showDialogToAdd() {
    this.newLocation = true;
    this.yardlocation = {
      row_id: -1,
      item_id: null,
      last_edit_at: new Date('01/01/0001'),
      last_edit_by: null,
      last_edit_comment: null,
      location_text: null
    };
    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.newLocation = false;
    this.yardlocation = this.cloneLocation(event.data);
    this.displayDialog = true;
  }

  cloneLocation(c: IYardLocation): IYardLocation {
    const location: IYardLocation = {
      row_id: null,
      item_id: null,
      last_edit_at: null,
      last_edit_by: null,
      last_edit_comment: null,
      location_text: null
    };
    for (const prop in c) {
      location[prop] = c[prop];
    }
    return location;
  }

}
