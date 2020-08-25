import { Component, OnInit, Input } from '@angular/core';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { Update } from '@ngrx/entity';
import { Product } from 'src/app/models/product/product';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';
import { updateUser, loadUsers } from 'src/app/store/actions/user.actions';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  @Input() model: any;
  faDollarSign = faDollarSign;
  user: User = new User();
  isAdmin: boolean;
  users: any = {};

  constructor(private accountService: AccountService, private store: Store<State>, private userService: UserService) {}

  ngOnInit(): void {
    this.accountService.user.subscribe((x) => (this.user = Object.assign(new User(), x)));
    console.log(this.user);
    this.userService.getUsers().subscribe((users) => {
      this.users = Object.assign(new Array<User>(), users);
      console.log(this.users);
      this.users.map((user) => {
        if (user.password === this.user.password) {
          this.user = Object.assign(new User(), user);
        }
      });    console.log(this.user);
    });
    this.isAdmin = this.isAdminn;
  }

  get isAdminn() : any {
    return this.user && this.user.role === Role.Admin;
  }

  buyProduct(id: number) {
    debugger;
    console.log(id);
    let ids: number[] = [];
    ids = Object.assign(new Array<number>(), this.user.boughtItemsIds);
    this.user.boughtItemsIds = [];
    this.user.boughtItemsIds.push(id);
    ids.map(id=>{
      this.user.boughtItemsIds.push(id);
    })

    this.user.boughtItemsIds = [...new Set(this.user.boughtItemsIds)];
    console.log(this.user);
    this.userService.editUser(this.user.id, this.user);
    this.userService.getUsers().subscribe(x=>{
      console.log(x);
    })
    alert("Purchased.");
  }
}
