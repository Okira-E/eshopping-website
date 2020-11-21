import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

import { User, Product } from '../object-models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public isUserEdit: boolean = false;
  public isProductEdit: boolean = false;
  public isCreateUser: boolean = false;
  public isCreateProduct: boolean = false;
  public user: User;
  public product: Product;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  public toggleIsEditUser($event) {
    this.isUserEdit = $event;
  }

  public toggleIsEditProduct($event) {
    this.isProductEdit = $event;
  }

  public toggleCreateUser($event) {
    this.isCreateUser = $event;
  }

  public toggleCreateProduct($event) {
    this.isCreateProduct = $event;
  }

  public recieveUser($event) {
    this.user = $event;
  }

  public recieveProduct($event) {
    this.product = $event;
  }

  public logout(): void {
    this.usersService.logout();
  }
}
