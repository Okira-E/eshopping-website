import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../models/users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public errorMessage: string = 'Welcome';
  public errMsgId: string = 'disappear';

  constructor(private usersService: UsersService) {}

  ngOnInit() {}

  public onRegister(form: NgForm) {
    const user: User = {
      firstName: form.value.fname,
      lastName: form.value.lname,
      email: form.value.email,
      password: form.value.pass,
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

    this.usersService.registerUser(user);
    this.usersService.getErrorMessage().subscribe((errMsg) => {
      this.errorMessage = errMsg;
      this.errMsgId = '';
    });
  }
}
