import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from 'src/app/services/account.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';

@Component({
  templateUrl: 'admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  loading = false;
  currentUser: User;
  userFromApi: User;
  users: User[] = [];

  constructor(
    private accountService: AccountService,
    private userService: UserService
  ) {
    this.currentUser = this.accountService.userValue;
  }

  ngOnInit() {
    this.loading = true;
    this.loading = true;
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => {
        this.loading = false;
        this.users = users;
      });
  }
}
