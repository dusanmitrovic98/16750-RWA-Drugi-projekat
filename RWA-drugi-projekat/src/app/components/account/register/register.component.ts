import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from './../../../services/account.service';
import { AlertService } from './../../../services/alert.service';
import { State } from 'src/app/store/reducers/root.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private store: Store<State>,
      private router: Router
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      this.alertService.clear();

      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.accountService.registerToStore(this.form.value);
      this.accountService.register(this.form.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                  this.router.navigate(['../login'], { relativeTo: this.route });
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}
