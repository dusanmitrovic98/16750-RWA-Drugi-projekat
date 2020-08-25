import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product/product';
import { UserService } from 'src/app/services/user.service';
import { AccountService } from 'src/app/services/account.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';
import { first } from 'rxjs/operators';
import { selectAllProducts } from 'src/app/store/adapters/product.adapter';
import { loadProduct } from 'src/app/store/actions/product.actions';
import { selectAllUsers } from 'src/app/store/adapters/user.adapter';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  loading = false;
  currentUser: User;
  userFromApi: User;
  products$: Observable<Product[]>;
  searchText: string = '';
  products: Product[] = [];
  users: any = {};

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.currentUser = this.accountService.userValue;
    this.loading = true;
    this.userService
      .getById(this.currentUser.id)
      .pipe(first())
      .subscribe((user) => {
        this.loading = false;
        this.userFromApi = Object.assign(new User(), user);
        console.log(user);
        this.products$ = this.store.select(selectAllProducts);
        this.products$.subscribe((products) => {
          this.userFromApi.boughtItemsIds.map((i) => {
            let p: Product = Object.assign(new Product(), products[i]);
            this.products.push(p);
            console.log(this.products);
            this.products = this.products.filter((x) => x.name != '');
          });
        });
      });
    this.userService.getUsers().subscribe((users) => {
      this.users = Object.assign(new Array<User>(), users);
      console.log(this.users);
      this.users.map((user) => {
        if (user.password === this.userFromApi.password) {
          this.userFromApi = Object.assign(new User(), user);
        }
      });    console.log(this.userFromApi);
    });

  }
}
