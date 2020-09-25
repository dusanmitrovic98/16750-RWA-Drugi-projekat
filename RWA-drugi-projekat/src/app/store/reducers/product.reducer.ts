import { ProductState, productAdapter } from '../adapters/product.adapter';
import {
  ProductsActions,
  ProductActionsTypes,
} from '../actions/product.actions';

export const initialState: ProductState = {
  ids: [],
  entities: {},
};

export function productsReducer(
  state: ProductState = initialState,
  action: ProductsActions
) {
  switch (action.type) {
    case ProductActionsTypes.ADD_PRODUCT_SUCCESS: {
      return productAdapter.addOne(action.product, state);
    }
    case ProductActionsTypes.ADD_PRODUCT_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    case ProductActionsTypes.LOAD_PRODUCTS_SUCCESS: {
      return productAdapter.setAll(action.products, state);
    }
    case ProductActionsTypes.LOAD_PRODUCTS_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    case ProductActionsTypes.LOAD_PRODUCT_SUCCESS: {
      return {
        ...state,
        selectedProduct: action.selectedProduct,
      };
    }
    case ProductActionsTypes.LOAD_PRODUCT_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    case ProductActionsTypes.UPDATE_PRODUCT: {
      return productAdapter.updateOne(action.product, state);
    }
    case ProductActionsTypes.DELETE_PRODUCT_SUCCESS: {
      return productAdapter.removeOne(action.id, state);
    }
    case ProductActionsTypes.DELETE_PRODUCT_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
}