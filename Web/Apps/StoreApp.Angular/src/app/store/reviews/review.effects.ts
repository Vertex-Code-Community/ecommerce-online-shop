import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ReviewActions from './review.actions';
import { ReviewService } from '../../core/services/review.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ReviewEffects {
  private actions$ = inject(Actions);
  private reviewService = inject(ReviewService);

  loadProductReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.loadProductReviews),
      mergeMap(({ productId }) =>
        this.reviewService.getReviewsByProductId(productId).pipe(
          map(reviews => ReviewActions.loadProductReviewsSuccess({ reviews, productId })),
          catchError(err => {
            console.error('Error loading reviews:', err);
            return of(ReviewActions.loadProductReviewsFailure({
              message: err?.message || 'Failed to load reviews',
              statusCode: err?.status || 500
            }));
          })
        )
      )
    )
  );
}
