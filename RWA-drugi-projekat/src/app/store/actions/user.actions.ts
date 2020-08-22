import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export enum UserActionsTypes {
  LOAD_USERS = '[Product List Component] Load Users',
  LOAD_USERS_SUCCESS = '[Product List Effect] Load Users Success',
  LOAD_USERS_FAILURE = '[Product List Effect] Load Users Failure',
}

export class loadUsers implements Action {
  readonly type = UserActionsTypes.LOAD_USERS;
  constructor() {}
}

export class loadUsersSuccess implements Action {
  readonly type = UserActionsTypes.LOAD_USERS_SUCCESS;
  constructor(public users: User[]) {}
}

export class loadUsersFailure implements Action {
  readonly type = UserActionsTypes.LOAD_USERS_FAILURE;
  constructor(public error: any) {}
}

export type UsersActions 
= loadUsers
| loadUsersSuccess
| loadUsersFailure
/*
//Load List Users
export const loadUsers = createAction('[Product List Component] Load Users');
export const loadUsersSuccess = createAction(
  '[Product List Effect] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[Product List Effect] Load Users Failure',
  props<{ error: any }>()
);*/
