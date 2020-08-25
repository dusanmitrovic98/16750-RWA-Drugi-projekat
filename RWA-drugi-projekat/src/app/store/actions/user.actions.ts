import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { Update } from '@ngrx/entity';

export enum UserActionsTypes {
  LOAD_USERS = '[Product List Component] Load Users',
  LOAD_USERS_SUCCESS = '[Product List Effect] Load Users Success',
  LOAD_USERS_FAILURE = '[Product List Effect] Load Users Failure',
  LOAD_USER = '[Product Components] Load User',
  LOAD_USER_SUCCESS = '[Product Effect] Load Product Success',
  LOAD_USER_FAILURE = '[Product Effect] Load User Failure',
  ADD_USER = '[Product Add Component] Add User',
  ADD_USER_SUCCESS =   '[Product Add Effect] Add User Success',
  ADD_USER_FAILURE = '[Product Add Effect] Add User Failure',
  UPDATE_USER = '[Product Edit Component] Update User',
  DELETE_USER = '[Product Components] Delete User',
  DELETE_USER_SUCCESS = '[Product Delete Effect] Delete User Success',
  DELETE_USER_FAILURE = '[Product Delete Effect] Delete User Failure',
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

export class loadUser implements Action {
  readonly type = UserActionsTypes.LOAD_USER;
  constructor(public id: string) {}
}
export class loadUserSuccess implements Action {
  readonly type = UserActionsTypes.LOAD_USER_SUCCESS;
  constructor(public selectedUser: User) {}
}
export class loadUserFailure implements Action {
  readonly type = UserActionsTypes.LOAD_USER_FAILURE;
  constructor(public error: any) {}
}
export class addUser implements Action {
  readonly type = UserActionsTypes.ADD_USER;
  constructor(public user: User) {}
}
export class addUserSuccess implements Action {
  readonly type = UserActionsTypes.ADD_USER_SUCCESS;
  constructor(public user: User) {}
}
export class addUserFailure implements Action {
  readonly type = UserActionsTypes.ADD_USER_FAILURE;
  constructor(public error: any) {}
}
export class updateUser implements Action {
  readonly type = UserActionsTypes.UPDATE_USER;
  constructor(public user: Update<User>) {}
}
export class deleteUser implements Action {
  readonly type = UserActionsTypes.DELETE_USER;
  constructor(public id: string) {}
}
export class deleteUserSuccess implements Action {
  readonly type = UserActionsTypes.DELETE_USER_SUCCESS;
  constructor(public id: string) {}
}
export class deleteUserFailure implements Action {
  readonly type = UserActionsTypes.DELETE_USER_FAILURE;
  constructor(public error: any) {}
}

export type UsersActions 
= loadUsers
| loadUsersSuccess
| loadUsersFailure
| loadUser
| loadUserSuccess
| loadUserFailure
| addUser
| addUserSuccess
| addUserFailure
| updateUser
| deleteUser
| deleteUserSuccess
| deleteUserFailure
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
