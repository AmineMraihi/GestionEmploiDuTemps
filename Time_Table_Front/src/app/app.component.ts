import {Component} from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'app';
  title = 'spring boot and angular 4 secure authentication';
  static API_URL = 'http://localhost:8080';
}
