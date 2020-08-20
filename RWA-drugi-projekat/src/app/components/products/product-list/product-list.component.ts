import { Component, OnInit } from "@angular/core";
import { Product } from "../../../models/product";
import { ProductService } from "../../../services/product.service";
import { Router } from "@angular/router";
import { ProductState, selectProducts } from "../../../products/store/index";
import { Store, select } from "@ngrx/store";
import * as fromActions from "../../../products/store/products.actions";
import { Observable } from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  //products: Product[] = [];
  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    public router: Router,
    private store: Store<ProductState>
  ) {}

  ngOnInit() {
    this.store.dispatch(fromActions.loadProducts());
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.store.pipe(select(selectProducts));
  }

  deleteProduct(id: number) {
    const productsObserver = {
      next: () => {
        console.log("Product Deleted");
        this.ngOnInit();
      },
      error: err => console.error(err)
    };
    this.productService.deleteProduct(id).subscribe(productsObserver);
  }
}
