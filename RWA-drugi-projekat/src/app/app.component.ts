import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { Role } from './models/role';
import { User } from './models/user';

@Component({ selector: 'app', templateUrl: 'app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent {
    title: string = 'RWA-drugi-projekat';
    user: User;

    constructor(private router: Router, private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.user = x);
    }

    get isAdmin() {
        return this.user && this.user.role === Role.Admin;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}