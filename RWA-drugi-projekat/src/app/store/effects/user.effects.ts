import { mergeMap, catchError, map, concatMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as fromUserActions from '../actions/user.actions';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

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

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromUserActions.loadUser>(
        fromUserActions.UserActionsTypes.LOAD_USER
      ),
      map((action) => action.id),
      mergeMap((id: string) =>
        this.userService.getUser(id).pipe(
          map((user) => ({
            type: fromUserActions.UserActionsTypes.LOAD_USER_SUCCESS,
            selectedUser: user,
          })),
          catchError((error) =>
            of(new fromUserActions.loadUserFailure({ error }))
          )
        )
      )
    )
  );

  createUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromUserActions.addUser>(
        fromUserActions.UserActionsTypes.ADD_USER
      ),
      mergeMap((action) =>
        this.userService.createUser(action.user).pipe(
          map((user) => ({
            type: fromUserActions.UserActionsTypes.ADD_USER_SUCCESS,
            user: user,
          })),
          catchError((error) =>
            of(new fromUserActions.addUserFailure({ error }))
          )
        )
      )
    )
  );

  updateUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<fromUserActions.updateUser>(
          fromUserActions.UserActionsTypes.UPDATE_USER
        ),
        concatMap((action) =>
          this.userService.editUser(action.user.id, action.user.changes)
        )
      ),
    { dispatch: false }
  );

  deleteUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.UserActionsTypes.DELETE_USER),
      map((action: fromUserActions.deleteUser) => action.id),
      mergeMap((id: string) =>
        this.userService.deleteUser(id).pipe(
          map(() => ({
            type: fromUserActions.UserActionsTypes.DELETE_USER_SUCCESS,
            id: id,
          })),
          catchError((error) =>
            of(new fromUserActions.deleteUserFailure({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
