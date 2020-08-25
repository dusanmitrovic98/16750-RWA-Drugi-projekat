import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Observable, of } from 'rxjs';
import { Product } from '../../../models/product/product';
import { Store, select } from '@ngrx/store';
import * as fromActions from '../../../store/actions/product.actions';
import { State } from 'src/app/store/reducers/root.reducer';
import { selectAllProducts } from 'src/app/store/adapters/product.adapter';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { Role } from 'src/app/models/role';

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
  model: any = {};
  modelProducts: any = {};
  searchText = '';
  user: User;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private sanitizer: DomSanitizer,
    public router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.accountService.user.subscribe((x) => (this.user = x));
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

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
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
