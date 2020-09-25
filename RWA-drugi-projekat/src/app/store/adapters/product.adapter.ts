import { Product } from 'src/app/models/product/product';
import { createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';

export const productAdapter = createEntityAdapter<Product>({});

export interface ProductState {
  ids: number[];
  entities: { [key: number]: Product };
}

export const getProductState = createFeatureSelector<ProductState>('products');

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = productAdapter.getSelectors(getProductState);

export const selectAllProducts = selectAll;
export const selectTotalProducts = selectTotal;
