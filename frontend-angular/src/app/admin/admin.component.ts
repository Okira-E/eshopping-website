import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

import { User } from './../models/users';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public isEdit: boolean = false;
  public user: User;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  public toggleIsEdit($event) {
    this.isEdit = $event;
  }

  public recieveUser($event) {
    this.user = $event;
  }

  public logout(): void {
    this.usersService.logout();
  }
}
