import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../services/product.service";
import { Product } from "../../../models/product/product";
import { ActivatedRoute, Router } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { ImageURL } from 'src/app/models/product/product-elements/image-url';
import { Description } from 'src/app/models/product/product-elements/description';
import { State } from 'src/app/store/reducers/root.reducer';
import { Update } from '@ngrx/entity';
import { updateProduct, loadProduct } from 'src/app/store/actions/product.actions';
import { getProductState, selectAllProducts } from 'src/app/store/adapters/product.adapter';
import { selectAllUsers } from 'src/app/store/adapters/user.adapter';

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
    private store: Store<State>
  ) {}
  model: any = {};
  productId: string = this.route.snapshot.paramMap.get("id");

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