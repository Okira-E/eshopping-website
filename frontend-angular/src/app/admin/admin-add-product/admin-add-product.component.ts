import { imageValidator } from './../../services/mime-type.validator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  public category: string = null;

  public isElectronicsTriggered: boolean = true;
  public isClothingsTriggered: boolean = false;

  public isLaptopsTriggered: boolean = false;
  public isTVsTriggered: boolean = false;
  public isTabletsTriggered: boolean = false;
  public isMobilePhonesTriggered: boolean = false;

  public isTshirtsTriggered: boolean = false;
  public isPantsTriggered: boolean = false;
  public isJacketsTriggered: boolean = false;
  public isShoesTriggered: boolean = false;

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
      category: new FormControl(),
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
    formData.append('category', this.getCategory());

    this.usersService.createProduct(formData);
    this.toggleCreateProduct();
  }

  public getCategory(): string {
    if (this.isElectronicsTriggered) {
      if (this.isLaptopsTriggered) {
        this.category = 'laptop';
      } else if (this.isTVsTriggered) {
        this.category = 'tv';
      } else if (this.isTabletsTriggered) {
        this.category = 'tablet';
      } else if (this.isMobilePhonesTriggered) {
        this.category = 'mobile';
      }
    } else {
      if (this.isTshirtsTriggered) {
        this.category = 'tshirt';
      } else if (this.isPantsTriggered) {
        this.category = 'pants';
      } else if (this.isJacketsTriggered) {
        this.category = 'jacket';
      } else if (this.isShoesTriggered) {
        this.category = 'shoe';
      }
    }

    return this.category;
  }

  public triggerElectronics(): void {
    // this.electronicsClass = "triggerd";
    this.isElectronicsTriggered = true;
    this.isClothingsTriggered = false;
  }

  public triggerClothings(): void {
    this.isClothingsTriggered = true;
    this.isElectronicsTriggered = false;
  }

  public triggerLaptops(): void {
    this.isLaptopsTriggered = true;
    this.isTVsTriggered = false;
    this.isTabletsTriggered = false;
    this.isMobilePhonesTriggered = false;
  }

  public triggerTVs(): void {
    this.isLaptopsTriggered = false;
    this.isTVsTriggered = true;
    this.isTabletsTriggered = false;
    this.isMobilePhonesTriggered = false;
  }

  public triggerTablets(): void {
    this.isLaptopsTriggered = false;
    this.isTVsTriggered = false;
    this.isTabletsTriggered = true;
    this.isMobilePhonesTriggered = false;
  }

  public triggerMobilePhones(): void {
    this.isLaptopsTriggered = false;
    this.isTVsTriggered = false;
    this.isTabletsTriggered = false;
    this.isMobilePhonesTriggered = true;
  }

  public triggerTshirts(): void {
    this.isTshirtsTriggered = true;
    this.isPantsTriggered = false;
    this.isJacketsTriggered = false;
    this.isShoesTriggered = false;
  }

  public triggerPants(): void {
    this.isTshirtsTriggered = false;
    this.isPantsTriggered = true;
    this.isJacketsTriggered = false;
    this.isShoesTriggered = false;
  }

  public triggerJackets(): void {
    this.isTshirtsTriggered = false;
    this.isPantsTriggered = false;
    this.isJacketsTriggered = true;
    this.isShoesTriggered = false;
  }

  public triggerShoes(): void {
    this.isTshirtsTriggered = false;
    this.isPantsTriggered = false;
    this.isJacketsTriggered = false;
    this.isShoesTriggered = true;
  }
}
