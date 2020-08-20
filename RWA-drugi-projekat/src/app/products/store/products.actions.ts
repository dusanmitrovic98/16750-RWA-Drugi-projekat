import { createAction, props } from '@ngrx/store';
import { Product } from './../../models/product'

export const loadProducts = createAction(
  '[Products List Component] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Products Effect] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Products Effect] Load Products Failure',
  props<{ error: any }>()
);
