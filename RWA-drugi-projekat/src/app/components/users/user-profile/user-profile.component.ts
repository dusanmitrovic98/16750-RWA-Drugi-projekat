import { selectAllProducts } from 'src/app/store/adapters/product.adapter';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { State } from 'src/app/store/reducers/root.reducer';
import { Product } from 'src/app/models/product/product';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  products$: Observable<Product[]>;
  products: Product[];
  searchText: string;
  currentUser: User;
  userFromApi: User;
  users: any = {};
  loading = false;

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private store: Store<State>
  ) {
    this.searchText = '';
    this.products = [];
  }

  ngOnInit(): void {
    this.currentUser = this.accountService.userValue;
    this.loading = true;
    this.userService
      .getById(this.currentUser.id)
      .pipe(first())
      .subscribe((user) => {
        this.loading = false;
        this.userFromApi = Object.assign(new User(), user);
      });
    this.userService.getUsers().subscribe((users) => {
      this.loading = false;
      this.users = Object.assign(new Array<User>(), users);
      this.users.map((user) => {
        if (user.password === this.userFromApi.password) {
          this.userFromApi = Object.assign(new User(), user);
          this.currentUser = this.userFromApi;
          console.log(this.userFromApi);
          this.products$ = this.store.select(selectAllProducts);
          this.products$.subscribe((products) => {
            console.log(this.userFromApi.boughtItemId);
            this.userFromApi.boughtItemId.map((i) => {
              let p: Product = Object.assign(new Product(), products[i]);
              this.products.push(p);
              this.products = this.products.filter((x) => x.name != '');
            });
          });
        }
      });
    });
  }
}
