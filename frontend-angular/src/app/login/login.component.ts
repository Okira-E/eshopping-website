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

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    const user: User = {
      email: form.value.email,
      password: form.value.pass,
    };

    if (user.email === '' || user.password === '') {
      return;
    }

    this.usersService.loginUser(user);
    this.usersService.getErrorMessage().subscribe((errMsg) => {
      this.errorMessage = errMsg;
    });
  }
}
