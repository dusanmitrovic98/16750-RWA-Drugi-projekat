import { ProductState } from '../adapters/product.adapter';
import { UserState } from '../adapters/user.adapter';
import { ActionReducerMap } from '@ngrx/store';
import { productsReducer } from './product.reducer';
import { usersReducer } from './user.reducer';

export interface State {
    products:ProductState,
    users:UserState
}

export const rootReducer: ActionReducerMap<State> = {
    products: productsReducer,
    users: usersReducer
}