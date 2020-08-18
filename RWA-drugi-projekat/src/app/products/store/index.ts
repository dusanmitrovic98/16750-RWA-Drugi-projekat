import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

export const productStateFeatureKey = 'productState';

export interface ProductsState {

}

export const reducers: ActionReducerMap<ProductsState> = {

};


export const metaReducers: MetaReducer<ProductsState>[] = !environment.production ? [] : [];
