import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { ProductService } from '../../core/services/product.service';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectCurrentPage, selectPageSize } from './product.selectors';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);
  private store = inject(Store<AppState>);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      withLatestFrom(
        this.store.select(selectCurrentPage),
        this.store.select(selectPageSize)
      ),
      mergeMap(([_, page, pageSize]) => {
        const safePage = page || 1;
        const safePageSize = pageSize || 10;
        return this.productService.getPagedProducts(safePage, safePageSize).pipe(
          map(result => ProductActions.loadProductsSuccess({ result })),
          catchError(err => {
            console.error('Error loading products:', err);
            return of(ProductActions.loadProductsFailure({ 
              message: err?.message || 'Failed to load products',
              statusCode: err?.status || 500
            }));
          })
        );
      })
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      mergeMap(({ id }) =>
        this.productService.getProductById(id).pipe(
          map(product => ProductActions.loadProductSuccess(product)),
          catchError(err => {
            console.error('Error loading product:', err);
            return of(ProductActions.loadProductFailure({ 
              message: err?.message || 'Failed to load product',
              statusCode: err?.status || 500
            }));
          })
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap(product =>
        this.productService.addProduct(product).pipe(
          map(() => ProductActions.addProductSuccess()),
          catchError(err => {
            console.error('Error adding product:', err);
            return of(ProductActions.addProductFailure({ 
              message: err?.message || 'Failed to add product',
              statusCode: err?.status || 500
            }));
          })
        )
      )
    )
  );

  reloadAfterAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProductSuccess),
      map(() => ProductActions.loadProducts())
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(product =>
        this.productService.updateProduct(product).pipe(
          map(() => ProductActions.updateProductSuccess()),
          catchError(err => {
            console.error('Error updating product:', err);
            return of(ProductActions.updateProductFailure({ 
              message: err?.message || 'Failed to update product',
              statusCode: err?.status || 500
            }));
          })
        )
      )
    )
  );

  reloadAfterUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProductSuccess),
      map(() => ProductActions.loadProducts())
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productService.deleteProductById(id).pipe(
          map(() => ProductActions.deleteProductSuccess()),
          catchError(err => {
            console.error('Error deleting product:', err);
            return of(ProductActions.deleteProductFailure({ 
              message: err?.message || 'Failed to delete product',
              statusCode: err?.status || 500
            }));
          })
        )
      )
    )
  );

  reloadAfterDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProductSuccess),
      map(() => ProductActions.loadProducts())
    )
  );

  setPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.setCurrentPage, ProductActions.setPageSize),
      map(() => ProductActions.loadProducts())
    )
  );
}
