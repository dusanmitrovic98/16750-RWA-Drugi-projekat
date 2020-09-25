import { selectAllProducts } from 'src/app/store/adapters/product.adapter';
import * as fromActions from '../../../store/actions/product.actions';
import { State } from 'src/app/store/reducers/root.reducer';
import { Product } from '../../../models/product/product';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productId: string = this.route.snapshot.paramMap.get('id');
  product$: Observable<Product>;
  products$: Observable<Product[]>;
  imageURLs: Observable<any>;
  modelProducts: any = {};
  searchText = '';
  model: any = {};

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private sanitizer: DomSanitizer,
    public router: Router
  ) {}

  ngOnInit() {
    this.store.pipe(select(selectAllProducts)).subscribe((products) => {
      this.products$ = of(products);
      this.modelProducts = Object.assign(new Array<Product>(), products);
      this.product$ = of(products[Number(this.productId) - 1]);
      this.model = Object.assign(
        new Product(),
        products[Number(this.productId) - 1]
      );
    });
  }

  deleteProduct(id: string) {
    this.store.dispatch(new fromActions.deleteProduct(id));
  }

  getFromURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  setSearchText(newItem: string) {
    console.log(newItem);
    this.searchText = newItem;
    this.store.pipe(select(selectAllProducts)).subscribe((products) => {
      this.product$ = of(products[Number(newItem) - 1]);
      this.model = Object.assign(new Product(), products[Number(newItem) - 1]);
    });
  }
}
