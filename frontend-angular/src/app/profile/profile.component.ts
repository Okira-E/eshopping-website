import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { imageValidator } from '../services/mime-type.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public imagePreview: string | ArrayBuffer = '';
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';

  public form: FormGroup;

  public onPasswordChange: boolean = false;
  public errorMessage: string = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getData();
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [imageValidator],
      }),
    });
  }

  public toggleRenderPasswordChange() {
    this.onPasswordChange = !this.onPasswordChange;
  }

  public toggleRenderImageSection() {
    this.imagePreview = '';
    this.form.get('image').updateValueAndValidity();
    console.log(this.form);
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

  public onChangeProfilePicture(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
    console.log(this.form);
  }

  public updateProfilePicture() {
    //
  }
}
