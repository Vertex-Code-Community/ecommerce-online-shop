import { createAction, props } from '@ngrx/store';
import { Review } from '../../shared/models/review/review';
import { ErrorResult } from '../../shared/models/errorResult';

export const loadProductReviews = createAction(
  '[Review] Load Product Reviews',
  props<{ productId: number }>()
);

export const loadProductReviewsSuccess = createAction(
  '[Review] Load Product Reviews Success',
  props<{ reviews: Review[]; productId: number }>()
);

export const loadProductReviewsFailure = createAction(
  '[Review] Load Product Reviews Failure',
  props<ErrorResult>()
);

export const clearReviews = createAction('[Review] Clear Reviews');
