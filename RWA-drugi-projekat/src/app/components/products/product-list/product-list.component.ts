import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product/product';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromProductActions from '../../../store/actions/product.actions';
import * as fromUserActions from '../../../store/actions/user.actions';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { State } from 'src/app/store/reducers/root.reducer';
import { selectAllProducts } from 'src/app/store/adapters/product.adapter';
import { selectAllUsers } from 'src/app/store/adapters/user.adapter';
import { AccountService } from 'src/app/services/account.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  users$: Observable<User[]>;
  model: any = {};
  searchText = '';
  currentUser: any;
  isAdmin: boolean;
  user: User;

  constructor(private router: Router, private store: Store<State>,private accountService: AccountService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    this.store.dispatch(new fromProductActions.loadProducts());
    this.loadProducts();
    this.store.dispatch(new fromUserActions.loadUsers());
    this.loadUsers();
    this.accountService.user.subscribe((x) => (this.user = x));
    this.isAdmin = this.isAdminn;
  }

  get isAdminn() : any {
    return this.user && this.user.role === Role.Admin;
  }
  
  loadProducts() {
    this.products$ = this.store.select(selectAllProducts);
    this.products$.subscribe((products) => {
      this.model = Object.assign(new Array<Product>(), products);
      console.clear();
      console.log(this.model);
      console.log(products);
    });
  }

  deleteProduct(id: string) {
    this.store.dispatch(new fromProductActions.deleteProduct(id));
  }

  loadUsers() {
    this.users$ = this.store.pipe(select(selectAllUsers));
  }

  setSearchText(newItem: string) {
    console.log(newItem);
    this.searchText = newItem;
  }  
}
