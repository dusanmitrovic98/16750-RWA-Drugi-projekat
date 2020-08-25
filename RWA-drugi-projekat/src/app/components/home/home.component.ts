import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { AccountService } from './../../services/account.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';
import { selectAllProducts } from 'src/app/store/adapters/product.adapter';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product/product';

@Component({ templateUrl: './home.component.html', styleUrls: ['./home.component.css'] })
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;
    products$: Observable<Product[]>;

    constructor(
        private userService: UserService,
        private accountService: AccountService,
        private store: Store<State>
    ) {
        this.currentUser = this.accountService.userValue;
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
        this.products$ = this.store.select(selectAllProducts);
        this.products$.subscribe(products => {
                products.reverse();
        })
    }
}