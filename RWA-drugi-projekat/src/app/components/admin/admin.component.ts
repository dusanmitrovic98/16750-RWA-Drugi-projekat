import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { AccountService } from 'src/app/services/account.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';

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
    private userService: UserService,
    private accountService: AccountService,
    private store: Store<State>
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
