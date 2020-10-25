import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { User } from '../models/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public errorMessage: string = '';
  public errMsgId: string = 'disappear';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  public onLogin(form: NgForm) {
    const user: User = {
      email: form.value.email,
      password: form.value.pass,
    };

    if (user.email === '' || user.password === '') {
      this.errorMessage = 'All fields are required';
      this.errMsgId = '';
      return;
    }

    this.usersService.loginUser(user, '/');
    this.usersService.getErrorMessage().subscribe((errMsg) => {
      this.errorMessage = errMsg;
      this.errMsgId = '';
    });
  }
}
