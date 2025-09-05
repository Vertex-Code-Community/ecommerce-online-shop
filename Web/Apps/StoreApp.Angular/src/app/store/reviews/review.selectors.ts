import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReviewState } from './review.reducer';

export const selectReviewState = createFeatureSelector<ReviewState>('review');

export const selectReviews = createSelector(
  selectReviewState,
  (state) => state?.reviews || []
);

export const selectReviewsLoading = createSelector(
  selectReviewState,
  (state) => state?.loading ?? false
);

export const selectReviewsError = createSelector(
  selectReviewState,
  (state) => state?.error || null
);

export const selectCurrentProductId = createSelector(
  selectReviewState,
  (state) => state?.currentProductId || null
);

export const selectReviewsForProduct = createSelector(
  selectReviews,
  selectCurrentProductId,
  (reviews, productId) => productId ? reviews : []
);
