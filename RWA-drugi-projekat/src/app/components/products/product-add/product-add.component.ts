import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Store } from '@ngrx/store';
import { Description } from 'src/app/models/product/product-elements/description';
import { ImageURL } from 'src/app/models/product/product-elements/image-url';
import { SocialLinks } from 'src/app/models/product/product-elements/social-links';
import { SystemRequirements } from 'src/app/models/product/product-elements/system-requirements';
import { State } from 'src/app/store/reducers/root.reducer';
import { addProduct } from 'src/app/store/actions/product.actions';
import { ActivatedRoute } from '@angular/router';
import { selectAllProducts } from 'src/app/store/adapters/product.adapter';
import { Product } from 'src/app/models/product/product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  model: any = {};
  test: string = "test";
  one: number = 1;
  descriptions: Description[] = new Array<Description>();
  detailedDescriptionImagesUrls: ImageURL[] = new Array<ImageURL>();
  socialLinks: SocialLinks = new SocialLinks();
  minSysReq: SystemRequirements = new SystemRequirements();
  recSysReq: SystemRequirements = new SystemRequirements();
  languages: string;

  constructor(
    private productService: ProductService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.descriptions.push(new Description('', ''));
    this.detailedDescriptionImagesUrls.push(new ImageURL(''));
    this.store.select(selectAllProducts).subscribe(products => {
    let product = products.filter(x => x.name === "Mortal Shell");
    this.model = Object.assign(new Product(), product[0]);
    console.log(this.model);
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
