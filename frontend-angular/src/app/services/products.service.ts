import { Product } from './../object-models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public url: string = 'http://0.0.0.0:3200';

  constructor(private http: HttpClient) {}

  public getProductsByCategory(category: string) {
    this.http
      .get(
        `${this.url}/api/products/getProductsByCategory?category=${category}`
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
