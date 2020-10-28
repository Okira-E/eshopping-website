import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  private isAdmin: boolean;

  constructor(
    private usersService: UsersService,
    private http: HttpClient,
    private router: Router
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.http
      .get(this.usersService.url + '/api/admin/validate')
      .subscribe(
        (_res) => {
          this.isAdmin = true;
          return true;
        },
        (_err) => {
          this.isAdmin = false;
          this.router.navigate(['/login']);
          return false;
        }
      );
    return this.isAdmin;
    // this.router.navigate(['/admin']);
  }
}
