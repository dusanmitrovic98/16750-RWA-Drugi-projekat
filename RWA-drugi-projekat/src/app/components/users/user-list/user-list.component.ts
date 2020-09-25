import { deleteUser, loadUsers } from 'src/app/store/actions/user.actions';
import { AccountService } from './../../../services/account.service';
import { State } from 'src/app/store/reducers/root.reducer';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users = null;

  constructor(
    private accountService: AccountService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.accountService
      .getAll()
      .pipe(first())
      .subscribe((users) => {
        this.users = users;
        console.log(this.users);
      });
  }

  deleteUser(id: string) {
    const user = this.users.find((x) => x.id === id);
    user.isDeleting = true;
    this.store.dispatch(new deleteUser(id));
    this.store.dispatch(new loadUsers());
    this.accountService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.users = this.users.filter((x) => x.id !== id);
      });
  }
}
