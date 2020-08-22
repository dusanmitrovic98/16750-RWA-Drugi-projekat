import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../services/product.service";
import { Product } from "../../../models/product/product";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductState } from 'src/app/products/store/product.reducer';
import { Store, select } from '@ngrx/store';
import { loadProduct, updateProduct } from 'src/app/products/store/product.actions';
import { selectedProduct } from 'src/app/products/store/product.selectors';
import { Update } from '@ngrx/entity';
import { ImageURL } from 'src/app/models/product/product-elements/image-url';
import { Description } from 'src/app/models/product/product-elements/description';

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.scss"]
})
export class ProductEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductService,
    private store: Store<ProductState>
  ) {}
  model: any = {};

  ngOnInit() {
    this.store.dispatch(
      loadProduct({id: this.route.snapshot.paramMap.get("id")})
      );
    this.store.pipe(select(selectedProduct)).subscribe(product => {
      this.model = Object.assign(new Product(), product);
    });
  }

  onSubmit() {
    const update: Update<Product> = {
      id: this.model.id,
      changes: this.model
    }
    this.store.dispatch(updateProduct({product: update}))
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