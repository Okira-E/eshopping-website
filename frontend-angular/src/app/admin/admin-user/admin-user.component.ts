import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { User } from './../../models/users';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
})
export class AdminUserComponent implements OnInit {

  @Input() public user: User;
  @Output() private isEditEvent = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  public redirectToAdmin(): void {
    this.isEditEvent.emit(false);
  }
}
