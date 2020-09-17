import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { imageValidator } from '../services/mime-type.validator';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  public profilePic: string;

  public form: FormGroup;

  public onPasswordChange: boolean = false;
  public errorMessage: string = '';

  constructor(
    private usersService: UsersService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [imageValidator],
      }),
    });
    this.http
      .get<{
        firstName: string;
        lastName: string;
        email: string;
        profilePic: string;
      }>(this.usersService.url + '/api/users/getdata')
      .subscribe((res) => {
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.email = res.email;
        this.profilePic = res.profilePic;
      });
  }

  public toggleRenderPasswordChange() {
    this.onPasswordChange = !this.onPasswordChange;
  }

  public toggleRenderImageSection() {
    this.imagePreview = '';
    this.form.get('image').updateValueAndValidity();
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
  }

  public updateProfilePicture() {
    const formData = new FormData();
    if (this.form.invalid) {
      return;
    }
    formData.append(
      'image',
      this.form.value.image,
      `${this.firstName}-${this.lastName}`
    );

    this.usersService.updateProfilePicture(formData);
    this.router.navigate(['/']);
  }
}
