import { loadUsers, updateUser } from 'src/app/store/actions/user.actions';
import { AccountService } from 'src/app/services/account.service';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { State } from 'src/app/store/reducers/root.reducer';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { Output } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  faDollarSign = faDollarSign;
  @Input() model: any;
  @Output() user: User;
  isAdmin: boolean;
  currentUser: any;
  bought: boolean;

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.bought = false;
    this.currentUser = this.accountService.userValue;
    this.userService.getUser(this.currentUser.id).subscribe((user) => {
      this.user = Object.assign(new User(), user);
      this.user.boughtItemId.map((id: number) => {
        this.bought = this.user.boughtItemId.includes(this.model.id - 1);
      });
      this.isAdmin = this.isAdminn;
    });
  }

  get isAdminn(): any {
    return this.user && this.user.role === Role.Admin;
  }

  buyProduct(id: number) {
    let ids: number[] = [];
    ids = Object.assign(new Array<number>(), this.user.boughtItemId);
    this.user.boughtItemId.push(id - 1);
    ids.map((id) => {
      this.user.boughtItemId.push(id);
    });
    this.user.boughtItemId = [...new Set(this.user.boughtItemId)];
    this.storeUpdateUser(this.user.id, this.user);
    this.bought = true;
  }

  storeUpdateUser(id: number, user: User) {
    const update: Update<User> = {
      id: id,
      changes: user,
    };
    this.store.dispatch(new updateUser(update));
    this.store.dispatch(new loadUsers());
  }
}
