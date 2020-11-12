import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public url: string = 'http://0.0.0.0:3200';
  private token: string = '';
  private isAuthenticated: boolean;
  private authStatusListener = new Subject<boolean>();
  private timeout: number = 4 * 24 * 60 * 60; // 4 days
  private tokenTimer;

  private errorMessage: string = '';
  private errorMessageListener = new BehaviorSubject<string>(this.errorMessage);
  private currentErrorMessage = this.errorMessageListener.asObservable();

  private passwordChangeErrorMessage: string = '';
  private passwordChangeErrorMessageListener = new BehaviorSubject<string>(
    this.passwordChangeErrorMessage
  );
  private currentPasswordChangeErrorMessage = this.passwordChangeErrorMessageListener.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Statics
  private static saveTokenInLocalStorage(token, expirationDate: Date): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private static clearTokenInLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private static getTokenFromLocalStorage() {
    const token: string = localStorage.getItem('token');
    const expiration: string = localStorage.getItem('expiration');
    if (!token || !expiration) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expiration),
    };
  }

  // Public

  public getErrorMessage() {
    return this.currentErrorMessage;
  }

  public getToken() {
    return this.token;
  }

  public getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  public getAuthStatus() {
    return this.authStatusListener.asObservable();
  }

  public registerUser(user: User) {
    this.http
      .post<{ token: string }>(`${this.url}/api/users/register/`, user)
      .subscribe(
        (res) => {
          this.token = res.token;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.tokenTimer = setTimeout(() => {
            this.token = null;
            this.isAuthenticated = false;
            this.authStatusListener.next(false);
            window.alert('Your session has expired, please sign in again');
            this.logout();
            this.router.navigate(['/login']);
          }, this.timeout * 1000);
          const now: Date = new Date();
          const expiration: Date = new Date(
            now.getTime() + this.timeout * 1000
          );
          UsersService.saveTokenInLocalStorage(this.token, expiration);
          this.router.navigate(['/']);
        },
        (err) => {
          this.errorMessageListener.next('Email has already been used');
        }
      );
  }

  public loginUser(user: User, redirectPath: string): void {
    this.http
      .post<{ token: string }>(`${this.url}/api/users/login/`, user)
      .subscribe(
        (res: { token: string }) => {
          this.token = res.token;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.tokenTimer = setTimeout(() => {
            this.token = null;
            this.isAuthenticated = false;
            this.authStatusListener.next(false);
            window.alert('Your session has expired, please sign in again');
            this.logout();
            this.router.navigate(['/login']);
          }, this.timeout * 1000);
          const now: Date = new Date();
          const expiration: Date = new Date(
            now.getTime() + this.timeout * 1000
          );
          UsersService.saveTokenInLocalStorage(this.token, expiration);
          this.router.navigate([redirectPath]);
        },
        (_err) => {
          this.errorMessageListener.next('Unable to login');
        }
      );
  }

  public loginAdmin(user: User, redirectPath: string): void {
    this.http
      .post<{ token: string }>(`${this.url}/api/admin/login/`, user)
      .subscribe(
        (res: { token: string }) => {
          this.token = res.token;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.tokenTimer = setTimeout(() => {
            this.token = null;
            this.isAuthenticated = false;
            this.authStatusListener.next(false);
            window.alert('Your session has expired, please sign in again');
            this.logout();
            this.router.navigate(['/login']);
          }, this.timeout * 1000);
          const now: Date = new Date();
          const expiration: Date = new Date(
            now.getTime() + this.timeout * 1000
          );
          UsersService.saveTokenInLocalStorage(this.token, expiration);
          this.router.navigate([redirectPath]);
        },
        (_err) => {
          this.errorMessageListener.next('Unable to login');
        }
      );
  }

  public updateProfilePicture(formData: FormData) {
    this.http
      .post(this.url + '/api/users/updateprofilepicture', formData)
      .subscribe();
  }

  public logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    UsersService.clearTokenInLocalStorage();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/login']);
  }

  public updatePassword(user: { oldPassword: string; newPassword: string }) {
    this.http.patch(this.url + '/api/users/updatepassword', user).subscribe(
      (_res) => {
        this.logout();
      },
      (_err) => {
        this.passwordChangeErrorMessageListener.next(
          'Current password is incorrect'
        );
      }
    );

    return this.currentPasswordChangeErrorMessage;
  }

  public deleteUser(user: User) {
    this.http.post(this.url + '/api/users/delete', user).subscribe();
  }

  public autoAuthUser() {
    const authHeader = UsersService.getTokenFromLocalStorage();
    if (!authHeader) {
      return;
    }
    const now = new Date();
    const isValid = authHeader.expirationDate > now;
    if (isValid) {
      this.token = authHeader.token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const duration: number =
        authHeader.expirationDate.getTime() - now.getTime();
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, duration);
    }
    return this.getIsAuth();
  }
}
