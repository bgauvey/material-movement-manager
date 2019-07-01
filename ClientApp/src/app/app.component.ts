import { Component } from '@angular/core';
import { PrintService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public printService: PrintService) { }
}
