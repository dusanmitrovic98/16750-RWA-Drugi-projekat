import { updateProduct, loadProduct } from 'src/app/store/actions/product.actions';
import { Description } from 'src/app/models/product/product-elements/description';
import { ImageURL } from 'src/app/models/product/product-elements/image-url';
import { selectAllProducts } from 'src/app/store/adapters/product.adapter';
import { State } from 'src/app/store/reducers/root.reducer';
import { Product } from "../../../models/product/product";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';


@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.scss"]
})
export class ProductEditComponent implements OnInit {
  productId: string;
  model: any = {};

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) {
    this.productId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    console.clear();
    console.log(this.productId);
    this.store.dispatch(
      new loadProduct(this.productId)
    )
    this.store.pipe(select(selectAllProducts)).subscribe(products => {
      this.model = Object.assign(new Product(), products[Number(this.productId)-1]);
      console.log(this.model)
    });
  }

  onSubmit() {
    const update: Update<Product> = {
      id: this.model.id,
      changes: this.model
    }
    console.log(this.model)
    this.store.dispatch(new updateProduct(update))
  }

  addDescription() {
    this.model.detailedDescription.push(new Description('', ''));
  }

  removeDescription() {
    this.model.detailedDescription.pop();
  }

  addImageURL() {
    this.model.detailedDescriptionImagesUrls.push(new ImageURL(''));
  }

  removeImageURL() {
    this.model.detailedDescriptionImagesUrls.pop();
  }
}