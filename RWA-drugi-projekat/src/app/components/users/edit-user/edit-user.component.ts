import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from './../../../services/account.service';
import { AlertService } from './../../../services/alert.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';
import {
  addUser,
  loadUsers,
  updateUser,
} from 'src/app/store/actions/user.actions';
import { Role } from 'src/app/models/role';
import { UserService } from 'src/app/services/user.service';
import { Update } from '@ngrx/entity';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  productId: string;
  isAddMode: boolean;
  submitted = false;
  form: FormGroup;
  loading = false;
  id: string;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<State>,
    private router: Router
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', passwordValidators],
    });

    if (!this.isAddMode) {
      this.accountService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.f.firstName.setValue(x.firstName);
          this.f.lastName.setValue(x.lastName);
          this.f.username.setValue(x.username);
        });
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.form.value.role = Role.User;
    this.form.value.boughtItemId = [];
    this.store.dispatch(new addUser(this.form.value));
    this.accountService
      .register(this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('User added successfully', {
            keepAfterRouteChange: true,
          });
          this.store.dispatch(new loadUsers());
          this.router.navigate(['.', { relativeTo: this.route }]);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  private updateUser() {
    this.form.value.role = Role.User;
    const update: Update<User> = {
      id: this.id,
      changes: this.form.value,
    };
    this.store.dispatch(new updateUser(update));
    this.accountService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Update successful', {
            keepAfterRouteChange: true,
          });
          this.store.dispatch(new loadUsers());
          this.router.navigate(['..', { relativeTo: this.route }]);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
