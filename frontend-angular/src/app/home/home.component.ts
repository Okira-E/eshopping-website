import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public categories = ['mobile', 'laptop', 'tablet', 'tv'];
  public products = [];

  constructor(
    private usersService: UsersService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    // for (let category of this.categories) {
    //   this.productsService.getProductsByCategory(category);
    // }
  }

  logout(): void {
    this.usersService.logout();
  }
}
