import { User } from '../../object-models';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css'],
})
export class AdminAddUserComponent implements OnInit {
  public errorMessage: string = '';
  public errMsgId: string = 'disappear';
  public isAdminInput: boolean = false;

  @Output() private isCreateUserEvent = new EventEmitter<boolean>();
  constructor(private usersService: UsersService) {}

  ngOnInit() {}

  public onRegister(form: NgForm) {
    const user: User = {
      firstName: form.value.fname,
      lastName: form.value.lname,
      email: form.value.email,
      password: form.value.pass,
      isAdmin: this.isAdminInput,
    };
    if (
      form.value.fname === '' ||
      form.value.lname === '' ||
      form.value.email === '' ||
      form.value.password === ''
    ) {
      this.errorMessage = 'All fields are required';
      this.errMsgId = '';
      return;
    } else if (form.invalid) {
      this.errorMessage = 'Password should be at least 8 characters long';
      this.errMsgId = '';
      return;
    }

    this.usersService.registerUserFromAdmin(user);
  }

  public toggleCreateUser(): void {
    this.isCreateUserEvent.emit(false);
    this.isCreateUserEvent.unsubscribe();
  }

  public toggleIsAdminInput(isAdmin: boolean) {
    this.isAdminInput = isAdmin;
  }
}
