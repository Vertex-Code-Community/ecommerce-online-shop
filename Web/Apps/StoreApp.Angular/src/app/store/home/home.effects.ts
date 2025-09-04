import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ProductService } from '../../core/services/product.service';
import { ReviewService } from '../../core/services/review.service';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);
  private reviewService = inject(ReviewService);

  loadTopSellingProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadTopSellingProducts),
      switchMap(() =>
        this.productService.getPagedProducts(1, 8, { sortBy: 'topselling' }).pipe(
          map(result => HomeActions.loadTopSellingProductsSuccess({ products: result.items })),
          catchError(error => of(HomeActions.loadTopSellingProductsFailure({ error })))
        )
      )
    )
  );

  loadNewArrivals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadNewArrivals),
      switchMap(() =>
        this.productService.getPagedProducts(1, 8, { sortBy: 'newarrival' }).pipe(
          map(result => HomeActions.loadNewArrivalsSuccess({ products: result.items })),
          catchError(error => of(HomeActions.loadNewArrivalsFailure({ error })))
        )
      )
    )
  );

  loadTopRatingReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadTopRatingReviews),
      switchMap(() =>
        this.reviewService.getTopRatingReviews().pipe(
          map(reviews => HomeActions.loadTopRatingReviewsSuccess({ reviews })),
          catchError(error => of(HomeActions.loadTopRatingReviewsFailure({ error })))
        )
      )
    )
  );
}
