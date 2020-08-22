import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { ProductService } from '../../../services/product.service';
import { Observable, of } from 'rxjs';
import { Product } from '../../../models/product/product';
import { Store, select } from '@ngrx/store';
import * as fromActions from '../../../store/actions/product.actions';
import { State } from 'src/app/store/reducers/root.reducer';
import { selectAllProducts } from 'src/app/store/adapters/product.adapter';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product$: Observable<Product>;
  productId: string = this.route.snapshot.paramMap.get('id');
  imageURLs: Observable<any>;
  model: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.store.pipe(select(selectAllProducts)).subscribe((products) => {
      this.product$ = of(products[Number(this.productId) - 1]);
      this.model = Object.assign(new Product(), products[Number(this.productId)-1]);
      console.log(this.model);
    });

    /*
    this.store.dispatch(
      fromActions.loadProduct({id: this.route.snapshot.paramMap.get("id")})
      );*/

    //this.product$ = this.store.pipe(select(selectedProduct));
  }

  deleteProduct(id: string) {
    // this.store.dispatch(fromActions.deleteProduct({id}));
  }
}
