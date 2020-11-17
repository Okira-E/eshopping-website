import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { User } from '../../models/users';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  public tableName: string = 'Users';
  public users: { fullName: string; email: string; isAdmin: boolean }[] = [];
  public products: { title: string; description: string; price: number }[] = [];
  public showLoadMore: boolean = true;
  public skip: number = 0;
  public isToggleProducts: boolean = false;

  public user: User;

  @Output() private isEditEvent = new EventEmitter<boolean>();
  @Output() private isCreateEvent = new EventEmitter<boolean>();
  @Output() private userEdit = new EventEmitter<User>();
  constructor(private usersService: UsersService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(this.usersService.url + `/api/admin/getUsers?skip=${this.skip}`)
      .subscribe((res: any) => {
        if (res.length === 0) {
          this.showLoadMore = false;
          return;
        } else if (res.length < 12) {
          this.showLoadMore = false;
        } else {
          this.showLoadMore = true;
        }
        this.users = [];
        for (const user of res) {
          const { firstName, lastName, email, isAdmin } = user;
          this.users.push({
            fullName: firstName + ' ' + lastName,
            email,
            isAdmin,
          });
        }
      });
  }

  public toggleProducts(): void {
    this.tableName = 'Products';
    this.isToggleProducts = true;

    this.http
      .get(
        this.usersService.url + `/api/products/getProducts?skip=${this.skip}`
      )
      .subscribe((res: any) => {
        if (res.length === 0) {
          this.showLoadMore = false;
          return;
        } else if (res.length < 12) {
          this.showLoadMore = false;
        }
        this.products = [];
        for (const product of res) {
          const { title, description, price } = product;
          this.products.push({
            title,
            description,
            price,
          });
        }
      });
  }

  public toggleUsers(): void {
    this.tableName = 'Users';
    this.isToggleProducts = false;
    this.ngOnInit();
  }

  public loadNextPage(): void {
    this.skip += 12;
    this.ngOnInit();
  }

  public loadPreviousPage(): void {
    this.showLoadMore = true;
    this.skip -= 12;
    this.ngOnInit();
  }

  public toggleEdit(user: User): void {
    this.isEditEvent.emit(true);
    this.userEdit.emit(user);
    this.isEditEvent.unsubscribe();
    this.userEdit.unsubscribe();
  }

  public toggleCreateUser(): void {
    this.isCreateEvent.emit(true);
    this.isCreateEvent.unsubscribe();
  }

  public logout(): void {
    this.usersService.logout();
  }
}
