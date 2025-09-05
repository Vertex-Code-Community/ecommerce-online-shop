import { createReducer, on } from '@ngrx/store';
import * as ReviewActions from './review.actions';
import { Review } from '../../shared/models/review/review';
import { ErrorResult } from '../../shared/models/errorResult';

export interface ReviewState {
  reviews: Review[];
  currentProductId: number | null;
  loading: boolean;
  error: ErrorResult | null;
}

export const initialState: ReviewState = {
  reviews: [],
  currentProductId: null,
  loading: false,
  error: null,
};

export const reviewReducer = createReducer(
  initialState,

  on(ReviewActions.loadProductReviews, (state, { productId }) => ({
    ...state,
    loading: true,
    error: null,
    currentProductId: productId
  })),

  on(ReviewActions.loadProductReviewsSuccess, (state, { reviews, productId }) => ({
    ...state,
    reviews,
    currentProductId: productId,
    loading: false,
    error: null
  })),

  on(ReviewActions.loadProductReviewsFailure, (state, error) => ({
    ...state,
    loading: false,
    error,
    reviews: []
  })),

  on(ReviewActions.clearReviews, (state) => ({
    ...state,
    reviews: [],
    currentProductId: null,
    loading: false,
    error: null
  }))
);
