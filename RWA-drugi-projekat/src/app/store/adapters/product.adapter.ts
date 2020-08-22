import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from 'src/app/models/product/product';
import { createFeatureSelector } from '@ngrx/store';
/*
export interface ProductState extends EntityState<Product> {
    // additional entities state properties
    error: any
    selectedProduct: Product
  }  

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();*/

export const productAdapter = createEntityAdapter<Product>({
  sortComparer:sortById
});

function sortById(e1: Product, e2: Product) {
  return e2.id - e1.id
}

export interface ProductState {
  ids:number[],
  entities:{[key:number]:Product}
};

export const getProductState= createFeatureSelector<ProductState>('products');

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = productAdapter.getSelectors(getProductState);

export const selectAllProducts=selectAll;
export const selectTotalProducts=selectTotal;