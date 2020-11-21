import { UsersService } from './../../services/users.service';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

import { Product } from './../../object-models';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent implements OnInit {
  @Input() public product: Product;
  @Output() private isEditProductEvent = new EventEmitter<boolean>();

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  public redirectToAdmin(): void {
    this.isEditProductEvent.emit(false);
    this.isEditProductEvent.unsubscribe();
  }

  public deleteProduct() {
    this.usersService.deleteProduct(this.product);
    this.redirectToAdmin();
  }
}
