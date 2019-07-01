import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrintService } from '../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(public printService: PrintService) { }

  ngOnInit() {
  }

}
