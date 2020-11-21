import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

import { User } from '../../object-models';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
})
export class AdminUserComponent implements OnInit {
  @Input() public user: User;
  @Output() private isEditUserEvent = new EventEmitter<boolean>();
  constructor(private userService: UsersService) {}

  ngOnInit(): void {}

  public redirectToAdmin(): void {
    this.isEditUserEvent.emit(false);
    this.isEditUserEvent.unsubscribe();
  }

  public deleteUser() {
    this.userService.deleteUser(this.user);
    this.redirectToAdmin();
  }
}
