import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as fromUserActions from '../actions/user.actions';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.UserActionsTypes.LOAD_USERS),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => ({
            type: fromUserActions.UserActionsTypes.LOAD_USERS_SUCCESS,
            users: users,
          })),
          catchError((error) =>
            of(new fromUserActions.loadUsersFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
}

/*
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) =>
          fromUserActions.loadUsersSuccess({ users })
          ),
          catchError((error) =>
            of(fromUserActions.loadUsersFailure({ error }))
          )
        )
      )
    )
  );*/
