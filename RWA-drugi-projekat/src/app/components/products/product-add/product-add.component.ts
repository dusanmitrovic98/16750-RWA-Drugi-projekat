
import { SystemRequirements } from 'src/app/models/product/product-elements/system-requirements';
import { SocialLinks } from 'src/app/models/product/product-elements/social-links';
import { Description } from 'src/app/models/product/product-elements/description';
import { ImageURL } from 'src/app/models/product/product-elements/image-url';
import { selectAllProducts } from 'src/app/store/adapters/product.adapter';
import { addProduct } from 'src/app/store/actions/product.actions';
import { State } from 'src/app/store/reducers/root.reducer';
import { Product } from 'src/app/models/product/product';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  detailedDescriptionImagesUrls: ImageURL[];
  minSysReq: SystemRequirements;
  recSysReq: SystemRequirements;
  descriptions: Description[];
  socialLinks: SocialLinks;
  languages: string;
  model: any = {};

  constructor(
    private store: Store<State>
  ) {
    this.detailedDescriptionImagesUrls = new Array<ImageURL>();
    this.descriptions = new Array<Description>();
    this.minSysReq = new SystemRequirements();
    this.recSysReq = new SystemRequirements();
    this.socialLinks = new SocialLinks();
  }

  ngOnInit() {
    this.descriptions.push(new Description('', ''));
    this.detailedDescriptionImagesUrls.push(new ImageURL(''));
    this.store.select(selectAllProducts).subscribe(products => {
    let product = products.filter(x => x.name === "Mortal Shell");
    this.model = Object.assign(new Product(), product[0]);
    })
  }

  onSubmit(f: NgForm) {
    f.value.detailedDescription = this.descriptions;
    f.value.detailedDescriptionImagesUrls = this.detailedDescriptionImagesUrls;
    f.value.socialLinks = this.socialLinks;
    f.value.minimumSysReq = this.minSysReq;
    f.value.recommendedSysReq = this.recSysReq;
    f.value.languagesSupported = this.languages;
    this.store.dispatch(new addProduct( f.value ));
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
