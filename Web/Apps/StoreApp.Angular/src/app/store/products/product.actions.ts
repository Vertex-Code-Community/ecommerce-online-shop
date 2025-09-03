import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/models/product/product';
import { FullProduct } from '../../shared/models/product/fullProduct';
import { PagedResult } from '../../shared/models/pagedResultT';
import { ErrorResult } from '../../shared/models/errorResult';

export const loadProducts = createAction('[Product] Load Products');

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ result: PagedResult<Product> }>()
);

export const loadProductsFailure = createAction('[Product] Load Products Failure', props<ErrorResult>());

export const loadProduct = createAction('[Product] Load Product', props<{ id: number }>());

export const loadProductSuccess = createAction('[Product] Load Product Success', props<FullProduct>());

export const loadProductFailure = createAction('[Product] Load Product Failure', props<ErrorResult>());

export const setCurrentPage = createAction('[Product] Set Current Page', props<{ page: number }>());

export const setPageSize = createAction('[Product] Set Page Size', props<{ pageSize: number }>());
