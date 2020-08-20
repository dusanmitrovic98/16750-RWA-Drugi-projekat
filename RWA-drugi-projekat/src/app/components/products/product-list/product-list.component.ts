import { Component, OnInit } from "@angular/core";
import { Product } from "../../../models/product";
import { ProductService } from "../../../services/product.service";
import { Router } from "@angular/router";
import { ProductState } from "../../../products/store/product.reducer";
import { Store, select } from "@ngrx/store";
import * as fromActions from "../../../products/store/product.actions";
import { Observable } from "rxjs";
import { selectProducts } from 'src/app/products/store/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
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

  deleteProduct(id: string) {
    this.store.dispatch(fromActions.deleteProduct({id}));
  }
}
