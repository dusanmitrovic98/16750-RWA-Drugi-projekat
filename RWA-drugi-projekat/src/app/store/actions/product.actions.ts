import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Product } from '../../models/product/product';

export enum ProductActionsTypes {
  LOAD_PRODUCTS = '[Product List Component] Load Products',
  LOAD_PRODUCTS_SUCCESS = '[Product List Effect] Load Products Success',
  LOAD_PRODUCTS_FAILURE = '[Product List Effect] Load Products Failure',
  LOAD_PRODUCT = '[Product Components] Load Product',
  LOAD_PRODUCT_SUCCESS = '[Product Effect] Load Product Success',
  LOAD_PRODUCT_FAILURE = '[Product Effect] Load Product Failure',
  ADD_PRODUCT = '[Product Add Component] Add Product',
  ADD_PRODUCT_SUCCESS =   '[Product Add Effect] Add Product Success',
  ADD_PRODUCT_FAILURE = '[Product Add Effect] Add Product Failure',
  UPDATE_PRODUCT = '[Product Edit Component] Update Product',
  DELETE_PRODUCT = '[Product Components] Delete Product',
  DELETE_PRODUCT_SUCCESS = '[Product Delete Effect] Delete Product Success',
  DELETE_PRODUCT_FAILURE = '[Product Delete Effect] Delete Product Failure',
}

export class loadProducts implements Action {
  readonly type = ProductActionsTypes.LOAD_PRODUCTS;
  constructor() {}
}

export class loadProductsSuccess implements Action {
  readonly type = ProductActionsTypes.LOAD_PRODUCTS_SUCCESS;
  constructor(public products: Product[]) {}
}

export class loadProductsFailure implements Action {
  readonly type = ProductActionsTypes.LOAD_PRODUCTS_FAILURE;
  constructor(public error: any) {}
}
export class loadProduct implements Action {
  readonly type = ProductActionsTypes.LOAD_PRODUCT;
  constructor(public id: string) {}
}
export class loadProductSuccess implements Action {
  readonly type = ProductActionsTypes.LOAD_PRODUCT_SUCCESS;
  constructor(public selectedProduct: Product) {}
}
export class loadProductFailure implements Action {
  readonly type = ProductActionsTypes.LOAD_PRODUCT_FAILURE;
  constructor(public error: any) {}
}
export class addProduct implements Action {
  readonly type = ProductActionsTypes.ADD_PRODUCT;
  constructor(public product: Product) {}
}
export class addProductSuccess implements Action {
  readonly type = ProductActionsTypes.ADD_PRODUCT_SUCCESS;
  constructor(public product: Product) {}
}
export class addProductFailure implements Action {
  readonly type = ProductActionsTypes.ADD_PRODUCT_FAILURE;
  constructor(public error: any) {}
}
export class updateProduct implements Action {
  readonly type = ProductActionsTypes.UPDATE_PRODUCT;
  constructor(public product: Update<Product>) {}
}
export class deleteProduct implements Action {
  readonly type = ProductActionsTypes.DELETE_PRODUCT;
  constructor(public id: string) {}
}
export class deleteProductSuccess implements Action {
  readonly type = ProductActionsTypes.DELETE_PRODUCT_SUCCESS;
  constructor(public id: string) {}
}
export class deleteProductFailure implements Action {
  readonly type = ProductActionsTypes.DELETE_PRODUCT_FAILURE;
  constructor(public error: any) {}
}

export type ProductsActions 
= loadProducts
| loadProductsSuccess
| loadProductsFailure
| loadProduct
| loadProductSuccess
| loadProductFailure
| addProduct
| addProductSuccess
| addProductFailure
| updateProduct
| deleteProduct
| deleteProductSuccess
| deleteProductFailure

/*
//Load List Products
export const loadProducts = createAction(
  '[Product List Component] Load Products'
);
export const loadProductsSuccess = createAction(
  '[Product List Effect] Load Products Success', 
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product List Effect] Load Products Failure', 
  props<{ error: any }>()
);
//Load Product
export const loadProduct = createAction(
  '[Product Components] Load Product', 
  props<{ id: string }>()
);
export const loadProductSuccess = createAction(
  '[Product Effect] Load Product Success', 
  props<{ selectedProduct: Product }>()
);
export const loadProductFailure = createAction(
  '[Product Effect] Load Product Failure', 
  props<{ error: any }>()
);

//Add Product
export const addProduct = createAction(
  '[Product Add Component] Add Product',
  props<{ product: Product }>()
);

export const addProductSuccess = createAction(
  '[Product Add Effect] Add Product Success',
  props<{ product: Product }>()
);

export const addProductFailure = createAction(
  '[Product Add Effect] Add Product Failure',
  props<{ error: any }>()
);

//Edit Component
export const updateProduct = createAction(
  '[Product Edit Component] Update Product',
  props<{ product: Update<Product> }>()
);

//Deleting Product
export const deleteProduct = createAction(
  '[Product Components] Delete Product',
  props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product Delete Effect] Delete Product Success',
  props<{ id: string }>()
);

export const deleteProductFailure = createAction(
  '[Product Delete Effect] Delete Product Failure',
  props<{ error: any }>()
);
*/
