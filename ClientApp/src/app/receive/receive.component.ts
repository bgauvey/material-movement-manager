import { Component, OnInit, ViewChild } from '@angular/core';
import { TransferService, UomService, StorageLocationsService, TicketService, RequestService } from '../services';
import { IStorageLocation, IUser, IRequest } from '../models';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateReason } from '../validators/submission.validation';
import { UserService } from '../services/user.service';



enum PageState {
  waitingOnPickTicket,
  waitingOnUnitTicket,
  waitingOnSubmit
}

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})
export class ReceiveComponent implements OnInit {
  // Reference barcodeListener variable inside Component
  @ViewChild('barcodeListener', { static: true }) barcodeListenerRef;
  state: PageState = PageState.waitingOnPickTicket;

  errorMsg: '';
  units = [];
  reasons = [];
  itemDesc = '';
  requestedBy = '';
  userDesc = '';
  receiveForm: FormGroup;
  destinations = [];
  sources = [];
  user: IUser;
  pickTicket: IRequest;

  constructor(private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private transferService: TransferService,
              private requestService: RequestService,
              private uomService: UomService,
              private userService: UserService,
              private storageLocationService: StorageLocationsService,
              private ticketService: TicketService,
              private formBuilder: FormBuilder,
              ) {
    this.reasons = [
      { label: 'Select Reason', value: null },
      { label: 'Normal Inventory', value: 1 },
      { label: 'Rework', value: 2 },
      { label: 'Cutback', value: 3 }];

  }

  ngOnInit() {
    this.receiveForm = this.formBuilder.group({
      sublot_no: ['', [Validators.required, Validators.maxLength(10)]],
      item_id: ['', [Validators.required, Validators.maxLength(18)]],
      req_qty: [0, [Validators.required, Validators.min(1)]],
      reason: ['', [Validators.required]],
      uom_id: [0, [Validators.required]],
      source: [0, [Validators.required]],
      dest: [0, [Validators.required]]
    }, {
        validators: [ValidateReason()]
      });

    this.userService.get().subscribe(user => this.user = user);

    this.storageLocationService.get().subscribe(data => {
      const sourceLocations = this.filterLocations(data, 'Source');
      const destLocations = this.filterLocations(data, 'Destination');
      this.sources.push({ label: 'Select Source', value: null });
      this.destinations.push({ label: 'Select Destination', value: null });

      sourceLocations.forEach(element => {
        this.sources.push({ label: element.scannable_id, value: element.ent_id });
      });
      destLocations.forEach(element => {
        this.destinations.push({ label: element.scannable_id, value: element.ent_id });
      });
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.receiveForm.controls; }

  onSubmit() {
    console.log(this.receiveForm.value);
    // stop here if form is invalid
    if (this.receiveForm.invalid) {
      return;
    }
    this.state = PageState.waitingOnPickTicket;
    this.transferService.post({
      item_id: this.receiveForm.controls.item_id.value,
      dest_ent_id: this.receiveForm.controls.dest.value,
      sublot_no: this.receiveForm.controls.sublot_no.value,
      qty_txd: this.receiveForm.controls.req_qty.value,
      source_ent_id: this.receiveForm.controls.source.value,
      terminal_id: this.user.hostName,
      uom_id: this.receiveForm.controls.uom_id.value,
      user_id: this.user.user_id,
      ir_row_id: this.pickTicket.row_id,
     } ).subscribe(
      data => {
        this.receiveForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transfer successficky posted' });
      },
      err => {
        console.error(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      }
    );
  }

  onCancel() {
    let leave = true;
    if (this.receiveForm.dirty) {
      leave = false;
      this.confirmationService.confirm({
        message: 'Are you sure that you want to cancel?',
        accept: () => {
          leave = true;
          this.state = PageState.waitingOnPickTicket;
        }
      });
    }
    if (leave) { this.state = PageState.waitingOnPickTicket; }
  }

  onError(event: any) {
    console.error(event);
    this.messageService.add({ severity: 'error', summary: 'Error', detail: event });
  }

  onScanComplete(event: any) {
    const barcode = event.toString().replace('Shift', '');
    if (barcode.substring(0, 1) === 'p' && this.state === PageState.waitingOnPickTicket) {
       const row = +barcode.replace(/\D/g, '');
       this.requestService.getRequest(row).subscribe(data => {
          this.pickTicket = data;
          if (this.pickTicket.state_cd !== 2) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Error',
              detail: 'The Pick Ticket is not IN PROCESS.  Scan not allowed.' });
          } else {
          this.state = PageState.waitingOnUnitTicket;
          }
        }, err => {
          console.error(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
        });
    } else if (this.state === PageState.waitingOnUnitTicket) {
    this.ticketService.getTicket(this.barcodeListenerRef.SerialNumber).subscribe(ticket => {
      if (ticket) {
          if (ticket.item_id === this.pickTicket.item_id) {
            this.requestedBy = this.pickTicket.requested_by;
            this.userDesc = this.pickTicket.user_desc;
            this.state = PageState.waitingOnSubmit;
            this.itemDesc = ticket.item_desc;
            this.receiveForm.setValue({
              item_id: ticket.item_id,
              req_qty: ticket.qty,
              sublot_no: ticket.sublot_no,
              reason: ticket.item_id.substring(0, 3) !== '730' ? 1 : null,
              uom_id: ticket.uom_id,
              source: ticket.item_id.substring(0, 3) !== '730' ? ticket.ent_id : null,
              dest: ticket.item_id.substring(0, 3) !== '730' ? ticket.dest_id : null,
            });
            this.uomService.getUom(ticket.item_id).subscribe(uoms => {
              this.units = [];
              uoms.forEach(element => {
                this.units.push({ label: element.description, value: element.uom_id });
              });
              this.receiveForm.controls.uom_id.setValue(ticket.uom_id);
            });
          } else {
            this.state = PageState.waitingOnPickTicket;
            this.messageService.add({
              severity: 'warn',
              summary: 'Unit Ticket Scan',
              detail: 'The scanned pick ticket\'s material does not match the scanned unit ticket\'s material'
            });
          }
      } else {
        this.state = PageState.waitingOnPickTicket;
        this.messageService.add({
          severity: 'warn',
          summary: 'Unit Ticket Scan',
          detail: 'Ticket not found for serial number ' + this.barcodeListenerRef.SerialNumber
      });
      }
    },
      err => {
        this.state = PageState.waitingOnPickTicket;
        console.error(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      });
    }
  }

  filterLocations(data: IStorageLocation[], filterType: string) {
    const filteredData = [];
    data.forEach(element => {
      if (element.type === filterType) {
        filteredData.push(element);
      }
    });
    return filteredData;
  }
}
