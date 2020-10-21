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

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.http.get(this.usersService.url + '/api/admin/validate').subscribe(
      (_res) => {
        this.isAdmin = true;
      },
      (_err) => {
        this.isAdmin = false;
        this.router.navigate(['/login']);
      }
    );

    if (!this.isAdmin) {
      this.router.navigate(['/admin']);
    }
    return this.isAdmin;
  }
}
