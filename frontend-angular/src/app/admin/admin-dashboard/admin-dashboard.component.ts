import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { User, Product } from '../../object-models';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  public tableName: string = 'Users';
  public users: { fullName: string; email: string; isAdmin: boolean }[] = [];
  public products: Product[] = [];
  public showLoadMore: boolean = true;
  public skip: number = 0;
  public isToggleProducts: boolean = false;

  public user: User;

  @Output() private isEditUserEvent = new EventEmitter<boolean>();
  @Output() private isEditProductEvent = new EventEmitter<boolean>();
  @Output() private isCreateUserEvent = new EventEmitter<boolean>();
  @Output() private isCreateProductEvent = new EventEmitter<boolean>();
  @Output() private userEdit = new EventEmitter<User>();
  @Output() private productEdit = new EventEmitter<Product>();
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

  public serializeField(field: string): string {
    if (field.length > 40) {
      field = field.substr(0, 40) + '...';
    }
    return field;
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
        } else {
          this.showLoadMore = true;
        }
        this.products = [];
        for (const product of res) {
          const { title, description, price, image } = product;
          this.products.push({
            title,
            description,
            price,
            image,
          });
        }
      });
  }

  public toggleUsers(): void {
    this.tableName = 'Users';
    this.isToggleProducts = false;
    this.ngOnInit();
  }

  public loadNextUsersPage(): void {
    this.skip += 12;
    this.ngOnInit();
  }

  public loadNextProductsPage(): void {
    this.skip += 12;
    this.toggleProducts();
  }

  public loadPreviousUsersPage(): void {
    this.showLoadMore = true;
    this.skip -= 12;
    this.ngOnInit();
  }

  public loadPreviousProductsPage(): void {
    this.showLoadMore = true;
    this.skip -= 12;
    this.toggleProducts();
  }

  public toggleEditUser(user: User): void {
    this.isEditUserEvent.emit(true);
    this.userEdit.emit(user);
    this.isEditUserEvent.unsubscribe();
    this.userEdit.unsubscribe();
  }

  public toggleEditProduct(product: Product): void {
    this.isEditProductEvent.emit(true);
    this.productEdit.emit(product);
    this.isEditProductEvent.unsubscribe();
    this.productEdit.unsubscribe();
  }

  public toggleCreateUser(): void {
    this.isCreateUserEvent.emit(true);
    this.isCreateUserEvent.unsubscribe();
  }

  public toggleCreateProduct(): void {
    this.isCreateProductEvent.emit(true);
    this.isCreateProductEvent.unsubscribe();
  }

  public logout(): void {
    this.usersService.logout();
  }
}
