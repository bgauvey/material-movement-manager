import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { stringify } from 'querystring';

export enum KEY_CODE {
  ENTER_KEY = 13
}


@Component({
  selector: 'app-barcode-listener',
  templateUrl: './barcode-listener.component.html',
  styleUrls: ['./barcode-listener.component.css']
})
export class BarcodeListenerComponent implements OnInit {
  @Output() ScanComplete: EventEmitter<any> = new EventEmitter();
  @Output() Error: EventEmitter<any> = new EventEmitter();

  rawData = '';
  isUniversalBarcode: boolean;
  UBC: UniversalBarcode;

  SerialNumber = '';

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ENTER_KEY) {
      if (this.rawData.length > 3) {
        this.parseData(this.rawData);
        this.rawData = '';
      }
    } else {
      if (event.key) {
        this.rawData += event.key;
      }
    }
  }

  parseData(data: string) {
    if (data.substring(0, 1) == 'u') {
      // Universal Barcode
      this.isUniversalBarcode = true;
      this.UBC = new UniversalBarcode(data);
      this.SerialNumber = this.UBC.SerialNumber;
      this.ScanComplete.emit(this.UBC);
    } else if (data.length === 10) {
      // serial number
      this.isUniversalBarcode = false;
      this.SerialNumber = data;
      this.ScanComplete.emit(this.SerialNumber);
    } else {
      this.ScanComplete.emit(data);
    }
  }
}

export class UniversalBarcode {

  ItemId = '';
  Quantity = '';
  SaleOrderNumber = '';
  SaleOrderLineNumber = '';
  PlanOrderNumber = '';
  SubOrder = '';
  SerialNumber = '';
  MaterialDoc = '';
  YardDropIdentifier = '';
  SubOrderQuantity = '';
  Location = '';
  LotNumber = '';

  constructor(data: string) {
    let convertData = '';
    let tag = '\0';
    for (const c of data.split('')) {
      if ('abcdefghijklmnopqrstuvwxyz'.indexOf(c) > 0) {
        tag = c;
        convertData = '';
      } else {
        switch (tag) {
          case 'm':
            convertData += c;
            this.ItemId = convertData;
            break;
          case 'q':
            convertData += c;
            this.Quantity = convertData;
            break;
          case 'o':
            convertData += c;
            this.SaleOrderNumber = convertData;
            break;
          case 'i':
            convertData += c;
            this.SaleOrderLineNumber = convertData;
            break;
          case 'p':
            convertData += c;
            this.SaleOrderNumber = convertData;
            break;
          case 'b':
            convertData += c;
            this.SubOrder = convertData;
            break;
          case 's':
            convertData += c;
            this.SerialNumber = convertData;
            break;
          case 'd':
            convertData += c;
            this.MaterialDoc = convertData;
            break;
          case 'y':
            convertData += c;
            this.YardDropIdentifier = convertData;
            break;
          case 'k':
            convertData += c;
            this.SubOrderQuantity = convertData;
            break;
          case 'l':
            convertData += c;
            this.Location = convertData;
            break;
          case 't':
            convertData += c;
            this.LotNumber = convertData;
            break;
        }
      }
    }
  }
}
