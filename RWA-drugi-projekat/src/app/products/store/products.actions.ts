import { createAction, props } from '@ngrx/store';
import { Product } from './../../models/product'

export const loadProductss = createAction(
  '[Products List Component] Load Productss'
);

export const loadProductssSuccess = createAction(
  '[Products List Component] Load Productss Success',
  props<{ products: Product[] }>()
);

export const loadProductssFailure = createAction(
  '[Products List Component] Load Productss Failure',
  props<{ error: any }>()
);
