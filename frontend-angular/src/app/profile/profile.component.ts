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
  public errorMessage: string = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getData();
  }

  public toggleRenderPasswordChange() {
    this.onPasswordChange = !this.onPasswordChange;
  }

  public getData() {
    this.usersService.getUserInfo();

    this.firstName = this.usersService.user.firstName;
    this.lastName = this.usersService.user.lastName;
    this.email = this.usersService.user.email;
  }

  public changePassword(form: NgForm) {
    const oldPassword = form.value.old_password;
    const newPassword = form.value.new_password;

    if (form.invalid) {
      this.errorMessage = 'Passwords should be at least 8 characters long';
      return;
    } else if (oldPassword === '' || newPassword === '') {
      this.errorMessage = 'Both fields are required';
      return;
    } else if (oldPassword === newPassword) {
      this.errorMessage = "Old password can't be the same as the new password";
      return;
    }

    this.usersService.updatePassword({ oldPassword, newPassword });
  }

  public updateProfilePicture() {
    //
  }
}
