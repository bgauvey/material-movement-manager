import { Component, OnInit } from '@angular/core';
import { IYardLocation } from '../models';
import { YardLocationsService } from '../services';

@Component({
  selector: 'app-yard-sheet',
  templateUrl: './yard-sheet.component.html',
  styleUrls: ['./yard-sheet.component.scss']
})
export class YardSheetComponent implements OnInit {
  constructor(private service: YardLocationsService) {}
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
  selected: IYardLocation[] = [];
  yardlocations: any[];

  data = [
    {
      row_id: 1,
      item_id: '61102218',
      location_text: 'WA10',
      last_edit_comment: '',
      last_edit_by: 'bgauvey',
      last_edit_at: new Date()
    }
  ];

  ngOnInit() {
    /*
    this.service.get().subscribe(data => {
      this.yardlocations = data;
    }, err => {
      console.error(err);
    });
    */
    this.yardlocations = this.data;
  }

  onDelete() {}

  onAdd() {}

  onEdit() {}

  save() {
    const yardlocations = [...this.yardlocations];
    const yardlocation = this.yardlocation;
    if (this.newLocation) {
      this.service.add(this.yardlocation).subscribe(
        data => {
          // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Record Created Successfully' });
          yardlocations.push(yardlocation);
        },
        err => {
          // this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
        }
      );
    } else {
      this.service.save(this.yardlocation).subscribe(
        data => {
          // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Record Updated Successfully' });
          yardlocations[
            this.yardlocations.indexOf(this.selected)
          ] = yardlocation;
        },
        err => {
          // this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
        }
      );
    }
    this.yardlocations = yardlocations;
    this.yardlocation = null;
    this.displayDialog = false;
  }

  delete() {
    this.service.delete(this.yardlocation).subscribe(
      data => {
        // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Record Removed Successfully' });
        const index = this.yardlocations.indexOf(this.selected);
        this.yardlocations = this.yardlocations.filter(
          (val: any, i: any) => i !== index
        );
      },
      err => {
        console.error(err);
      }
    );
    this.yardlocation = null;
    this.displayDialog = false;
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
}
