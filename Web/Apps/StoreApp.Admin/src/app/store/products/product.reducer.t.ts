import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Product } from '../../shared/models/product/product';
import { FullProduct } from '../../shared/models/product/fullProduct';
import {ErrorResult} from '../../shared/models/errorResult';

export interface ProductState {
  products: Product[];
  totalCount: number;
  currentProduct: FullProduct | null;
  loading: boolean;
  error: ErrorResult | null;
  currentPage: number;
  pageSize: number;
}

export const initialState: ProductState = {
  products: [],
  totalCount: 0,
  currentProduct: null,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
};

export const productReducer = createReducer(
  initialState,

  on(ProductActions.loadProducts, (state) => ({ 
    ...state, 
    loading: true, 
    error: null,
    totalCount: state.totalCount || 0,
    currentPage: state.currentPage || 1,
    pageSize: state.pageSize || 10
  })),
  on(ProductActions.loadProductsSuccess, (state, { result }) => ({
    ...state,
    products: result.items || [],
    totalCount: result.totalCount || 0,
    loading: false,
  })),
  on(ProductActions.loadProductsFailure, (state, error) => ({ 
    ...state, 
    loading: false, 
    error,
    // Reset to safe defaults on failure
    totalCount: 0,
    products: []
  })),

  // Load single product
  on(ProductActions.loadProduct, (state) => ({ 
    ...state, 
    loading: true, 
    error: null 
  })),
  on(ProductActions.loadProductSuccess, (state, product) => ({ 
    ...state, 
    currentProduct: product, 
    loading: false 
  })),
  on(ProductActions.loadProductFailure, (state, error) => ({ 
    ...state, 
    loading: false, 
    error 
  })),

  // Add product
  on(ProductActions.addProduct, (state) => ({ 
    ...state, 
    loading: true, 
    error: null 
  })),
  on(ProductActions.addProductSuccess, (state) => ({ 
    ...state, 
    loading: false 
  })),
  on(ProductActions.addProductFailure, (state, error) => ({ 
    ...state, 
    loading: false, 
    error 
  })),

  // Update product
  on(ProductActions.updateProduct, (state) => ({ 
    ...state, 
    loading: true, 
    error: null 
  })),
  on(ProductActions.updateProductSuccess, (state) => ({ 
    ...state, 
    loading: false 
  })),
  on(ProductActions.updateProductFailure, (state, error) => ({ 
    ...state, 
    loading: false, 
    error 
  })),

  // Delete product
  on(ProductActions.deleteProduct, (state) => ({ 
    ...state, 
    loading: true, 
    error: null 
  })),
  on(ProductActions.deleteProductSuccess, (state) => ({ 
    ...state, 
    loading: false 
  })),
  on(ProductActions.deleteProductFailure, (state, error) => ({ 
    ...state, 
    loading: false, 
    error 
  })),

  on(ProductActions.setCurrentPage, (state, { page }) => ({ 
    ...state, 
    currentPage: page || 1 
  })),
  on(ProductActions.setPageSize, (state, { pageSize }) => ({ 
    ...state, 
    pageSize: pageSize || 10 
  })),
);
