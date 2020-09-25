import { createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const userAdapter = createEntityAdapter<User>({});

export interface UserState {
  ids: number[];
  entities: { [key: number]: User };
}

export const getUserState = createFeatureSelector<UserState>('products');

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = userAdapter.getSelectors(getUserState);

export const selectAllUsers = selectAll;
export const selectTotalUsers = selectTotal;
