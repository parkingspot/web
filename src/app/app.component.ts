import { Component, ViewChild } from '@angular/core';
import {NavComponent} from './components/misc/nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild(NavComponent) child: any;

  closeButton() {
    this.child.onclickClose();
  }
}
