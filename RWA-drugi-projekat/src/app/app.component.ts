import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from './services/account.service';
import { Role } from './models/role';
import { User } from './models/user';

@Component({ selector: 'app', templateUrl: 'app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent {
    title: string = 'RWA-drugi-projekat';
    user: User;

    constructor(private router: Router, private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    get isAdmin() {
        return this.user && this.user.role === Role.Admin;
    }

    logout() {
        this.accountService.logout();
    }
}