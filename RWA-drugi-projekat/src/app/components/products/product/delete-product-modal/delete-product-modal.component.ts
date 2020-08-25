import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';
import { selectAllProducts } from 'src/app/store/adapters/product.adapter';
import * as fromProductActions from '../../../../store/actions/product.actions';
import { Product } from 'src/app/models/product/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css'],
})
export class DeleteProductModalComponent implements OnInit {
  productId: string = this.route.snapshot.paramMap.get('id');
  model: any = {};

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectAllProducts)).subscribe((products) => {
      this.model = Object.assign(
        new Product(),
        products[Number(this.productId) - 1]
      );
    });
  }

  deleteProduct() {
    this.store.dispatch(new fromProductActions.deleteProduct(this.productId));

  }
}
