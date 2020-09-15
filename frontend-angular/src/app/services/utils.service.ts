import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private url = this.location.path();

  constructor(private location: Location) {}

  public getUrl() {
    return this.url;
  }
}
