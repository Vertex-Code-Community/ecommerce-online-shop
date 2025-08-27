import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/models/product/product';
import { FullProduct } from '../../shared/models/product/fullProduct';
import { CreateProduct } from '../../shared/models/product/createProduct';
import { UpdateProduct } from '../../shared/models/product/updateProduct';
import { PagedResult } from '../../shared/models/pagedResultT';
import { ErrorResult } from '../../shared/models/errorResult';

export const loadProducts = createAction('[Product] Load Products',
  props<{ page: number; pageSize: number }>()
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ result: PagedResult<Product> }>()
);

export const loadProductsFailure = createAction('[Product] Load Products Failure', props<ErrorResult>());

export const loadProduct = createAction('[Product] Load Product', props<{ id: number }>());

export const loadProductSuccess = createAction('[Product] Load Product Success', props<FullProduct>());

export const loadProductFailure = createAction('[Product] Load Product Failure', props<ErrorResult>());
export const addProduct = createAction('[Product] Add Product', props<CreateProduct>());

export const addProductSuccess = createAction('[Product] Add Product Success');

export const addProductFailure = createAction('[Product] Add Product Failure', props<ErrorResult>());

export const updateProduct = createAction('[Product] Update Product', props<UpdateProduct>());

export const updateProductSuccess = createAction('[Product] Update Product Success');

export const updateProductFailure = createAction('[Product] Update Product Failure', props<ErrorResult>());

export const deleteProduct = createAction('[Product] Delete Product', props<{ id: number }>());

export const deleteProductSuccess = createAction('[Product] Delete Product Success');

export const deleteProductFailure = createAction('[Product] Delete Product Failure', props<ErrorResult>());

export const setCurrentPage = createAction('[Product] Set Current Page', props<{ page: number }>());

export const setPageSize = createAction('[Product] Set Page Size', props<{ pageSize: number }>());
