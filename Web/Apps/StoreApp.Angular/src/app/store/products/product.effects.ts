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

  setPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.setCurrentPage, ProductActions.setPageSize),
      map(() => ProductActions.loadProducts())
    )
  );
}
