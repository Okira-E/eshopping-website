import { imageValidator } from './../../services/mime-type.validator';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css'],
})
export class AdminAddProductComponent implements OnInit {
  public form: FormGroup;
  public imagePreview: string | ArrayBuffer = '';

  private title: AbstractControl;
  private description: AbstractControl;

  @Output() private isCreateProductEvent = new EventEmitter<boolean>();
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [imageValidator],
      }),
      title: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
    });
  }

  public toggleCreateProduct(): void {
    setTimeout(() => {
      this.isCreateProductEvent.emit(false);
      this.isCreateProductEvent.unsubscribe();
    }, 50);
  }

  public onUploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  public uploadImage() {
    const formData = new FormData();
    if (this.form.invalid) {
      return;
    }
    let newTitle = '';
    for (const char of this.form.value.title) {
      if (char !== ' ') {
        newTitle += char;
      } else {
        newTitle += '-';
      }
    }

    formData.append('image', this.form.value.image, `${newTitle}`);
    formData.append('title', this.form.value.title);
    formData.append('description', this.form.value.description);
    formData.append('price', this.form.value.price);

    this.usersService.CreateProduct(formData);
    this.toggleCreateProduct();
  }
}
