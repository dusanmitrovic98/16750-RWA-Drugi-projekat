import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { AccountService } from './../../services/account.service';

@Component({ templateUrl: 'home.component.html', styleUrls: ['./home.component.css'] })
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;

    constructor(
        private userService: UserService,
        private accountService: AccountService
    ) {
        this.currentUser = this.accountService.userValue;
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    }
}