import { Component } from '@angular/core';
import { SignalRService } from './services/signal-r.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material-movement-manager';

  constructor(public signalRService: SignalRService, private http: HttpClient) { }


  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addMessageListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:5001/api/message')
      .subscribe(res => {
        console.log(res);
      });
  }
}
