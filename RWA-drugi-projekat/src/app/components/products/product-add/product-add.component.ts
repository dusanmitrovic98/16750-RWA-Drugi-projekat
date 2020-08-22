import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductState } from 'src/app/products/store/product.reducer';
import { addProduct } from 'src/app/products/store/product.actions';
import { Description } from 'src/app/models/product/product-elements/description';
import { ImageURL } from 'src/app/models/product/product-elements/image-url';
import { SocialLinks } from 'src/app/models/product/product-elements/social-links';
import { SystemRequirements } from 'src/app/models/product/product-elements/system-requirements';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  descriptions: Description[] = new Array<Description>();
  detailedDescriptionImagesUrls: ImageURL[] = new Array<ImageURL>();
  socialLinks: SocialLinks = new SocialLinks();
  minSysReq: SystemRequirements = new SystemRequirements();
  recSysReq: SystemRequirements = new SystemRequirements();
  languages: string;

  constructor(
    private productService: ProductService,
    private store: Store<ProductState>
  ) {}

  ngOnInit() {
    this.descriptions.push(new Description('', ''));
    this.detailedDescriptionImagesUrls.push(new ImageURL(''));
  }

  onSubmit(f: NgForm) {
    f.value.detailedDescription = this.descriptions;
    f.value.detailedDescriptionImagesUrls = this.detailedDescriptionImagesUrls;
    f.value.socialLinks = this.socialLinks;
    f.value.minimumSysReq = this.minSysReq;
    f.value.recommendedSysReq = this.recSysReq;
    f.value.languagesSupported = this.languages;
    this.store.dispatch(addProduct({ product: f.value }));
  }

  addDescription() {
    this.descriptions.push(new Description('', ''));
  }

  removeDescription() {
    this.descriptions.pop();
  }

  addImageURL() {
    this.detailedDescriptionImagesUrls.push(new ImageURL(''));
  }

  removeImageURL() {
    this.detailedDescriptionImagesUrls.pop();
  }
}
