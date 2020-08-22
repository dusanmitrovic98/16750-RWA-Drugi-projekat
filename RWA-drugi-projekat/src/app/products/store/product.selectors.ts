/*import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, productsFeatureKey, selectAll } from '../../store/reducers/product.reducer';
import * as userStore from '../../store/reducers/user.reducer'
import { UserState, usersFeatureKey } from '../../store/reducers/user.reducer';

export const selectProductState = createFeatureSelector<ProductState>(
    productsFeatureKey
    );

export const selectProducts = createSelector(selectProductState, selectAll);    
export const selectedProduct = createSelector(selectProductState, (state: ProductState) => state.selectedProduct);


export const selectUserState = createFeatureSelector<UserState>(
    usersFeatureKey
    );

export const selectUsers = createSelector(selectUserState, userStore.selectAll);    
export const selectedUser = createSelector(selectUserState, (state: UserState) => state.selectedUser);
    */