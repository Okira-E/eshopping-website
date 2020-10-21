import { User } from './../models/users';
import { NgForm } from '@angular/forms';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  public errorMessage: string = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  public onLogin(form: NgForm) {
    const user: User = {
      email: form.value.email,
      password: form.value.pass,
    };

    if (user.email === '' || user.password === '') {
      this.errorMessage = 'All fields are required';
      return;
    }

    this.usersService.loginAdmin(user, '/admin/dashboard');
    this.usersService.getErrorMessage().subscribe((errMsg) => {
      this.errorMessage = errMsg;
    });
  }
}
