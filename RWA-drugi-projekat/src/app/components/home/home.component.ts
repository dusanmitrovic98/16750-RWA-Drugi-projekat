import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { selectAllProducts } from 'src/app/store/adapters/product.adapter';
import { AccountService } from './../../services/account.service';
import { UserService } from './../../services/user.service';
import { State } from 'src/app/store/reducers/root.reducer';
import { Product } from 'src/app/models/product/product';
import { User } from './../../models/user';
import { Store } from '@ngrx/store';

@Component({ templateUrl: './home.component.html', styleUrls: ['./home.component.css'] })
export class HomeComponent {
    products$: Observable<Product[]>;
    loading = false;
    currentUser: User;
    userFromApi: User;

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
    }
}