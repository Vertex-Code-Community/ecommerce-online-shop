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

export const selectHomeLoading = createSelector(
  selectTopSellingLoading,
  selectNewArrivalsLoading,
  (topSellingLoading, newArrivalsLoading) => topSellingLoading || newArrivalsLoading
);

export const selectHomeError = createSelector(
  selectTopSellingError,
  selectNewArrivalsError,
  (topSellingError, newArrivalsError) => topSellingError || newArrivalsError
);
