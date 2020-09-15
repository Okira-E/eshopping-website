import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public img: ImageData;
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';

  public onPasswordChange: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getData();
  }

  public toggleRenderPasswordChange() {
    this.onPasswordChange = !this.onPasswordChange;
  }

  public getData() {
    this.firstName = 'Omar';
    this.lastName = 'Rafat';
    this.email = 'omarrafat60@gmail.com';
  }

  public changePassword(form: NgForm) {
    const oldPassword = form.value.old_password;
    const newPassword = form.value.new_password;

    this.usersService.updatePassword({ oldPassword, newPassword });
  }
}
