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
      return productAdapter.addAll(action.products, state);
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
/*
export const productsFeatureKey = 'products';




export const initialProductState: ProductState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedProduct: undefined
});

export const productReducer = createReducer(
  initialProductState,
  on(ProductActions.addProductSuccess,
    (state, action) => adapter.addOne(action.product, state)
  ),
  on(ProductActions.addProductFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      }
    }
  ),
  on(ProductActions.loadProductsSuccess,
    (state, action) => adapter.setAll(action.products, state)
  ),
  on(ProductActions.loadProductsFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      }
    }
  ),
  on(ProductActions.loadProductSuccess,
    (state, action) => {
      return {
        ...state,
        selectedProduct: action.selectedProduct
      }
    }
  ),
  on(ProductActions.loadProductFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      }
    }
  ),
  on(ProductActions.updateProduct,
    (state, action) => adapter.updateOne(action.product, state)
  ),
  on(ProductActions.deleteProductSuccess,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ProductActions.deleteProductFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      }
    }
  )
);

export function reducer(state: ProductState | undefined, action: Action){
  return productReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
*/
