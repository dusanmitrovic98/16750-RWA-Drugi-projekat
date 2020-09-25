import { Product } from '../../models/product/product';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

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