import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  messages: string[] = [];
  totalNotifications: number = 0;
  newNotifications: number = 0;

  constructor() {
  }
}
