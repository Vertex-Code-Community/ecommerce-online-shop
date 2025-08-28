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
      mergeMap(([_, page, pageSize]) =>
        this.productService.getPagedProducts(page, pageSize).pipe(
          map(result => ProductActions.loadProductsSuccess({ result })),
          catchError(err => of(ProductActions.loadProductsFailure(err)))
        )
      )
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      mergeMap(({ id }) =>
        this.productService.getProductById(id).pipe(
          map(product => ProductActions.loadProductSuccess(product)),
          catchError(err => of(ProductActions.loadProductFailure(err)))
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
          catchError(err => of(ProductActions.addProductFailure(err)))
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
          catchError(err => of(ProductActions.updateProductFailure(err)))
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
          catchError(err => of(ProductActions.deleteProductFailure(err)))
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
