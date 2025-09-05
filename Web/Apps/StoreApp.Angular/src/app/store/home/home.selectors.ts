import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.reducer';

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const selectTopSellingProducts = createSelector(
  selectHomeState,
  (state: HomeState) => state.topSellingProducts
);

export const selectTopSellingLoading = createSelector(
  selectHomeState,
  (state: HomeState) => state.topSellingLoading
);

export const selectTopSellingError = createSelector(
  selectHomeState,
  (state: HomeState) => state.topSellingError
);

export const selectNewArrivals = createSelector(
  selectHomeState,
  (state: HomeState) => state.newArrivals
);

export const selectNewArrivalsLoading = createSelector(
  selectHomeState,
  (state: HomeState) => state.newArrivalsLoading
);

export const selectNewArrivalsError = createSelector(
  selectHomeState,
  (state: HomeState) => state.newArrivalsError
);

export const selectTopRatingReviews = createSelector(
  selectHomeState,
  (state: HomeState) => state.topRatingReviews
);

export const selectTopRatingReviewsLoading = createSelector(
  selectHomeState,
  (state: HomeState) => state.topRatingReviewsLoading
);

export const selectTopRatingReviewsError = createSelector(
  selectHomeState,
  (state: HomeState) => state.topRatingReviewsError
);

export const selectHomeLoading = createSelector(
  selectTopSellingLoading,
  selectNewArrivalsLoading,
  selectTopRatingReviewsLoading,
  (topSellingLoading, newArrivalsLoading, topRatingReviewsLoading) => 
    topSellingLoading || newArrivalsLoading || topRatingReviewsLoading
);

export const selectHomeError = createSelector(
  selectTopSellingError,
  selectNewArrivalsError,
  selectTopRatingReviewsError,
  (topSellingError, newArrivalsError, topRatingReviewsError) => 
    topSellingError || newArrivalsError || topRatingReviewsError
);
