import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from './../../../services/account.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';
import { deleteUser, loadUsers } from 'src/app/store/actions/user.actions';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users = null;

  constructor(private accountService: AccountService,
    private store: Store<State>, private userService: UserService) {}

  ngOnInit() {
      this.accountService.getAll()
          .pipe(first())
          .subscribe(users => this.users = users);
  }

  deleteUser(id: string) {
      const user = this.users.find(x => x.id === id);
      user.isDeleting = true;
      this.userService.deleteUser(id);
      this.accountService.delete(id)
          .pipe(first())
          .subscribe(() => {
              this.users = this.users.filter(x => x.id !== id) 
          });
  }
}
