import { createReducer, on } from '@ngrx/store';
import { Product } from '../../shared/models/product/product';
import { Review } from '../../shared/models/review/review';
import * as HomeActions from './home.actions';

export interface HomeState {
  topSellingProducts: Product[];
  topSellingLoading: boolean;
  topSellingError: any;
  
  newArrivals: Product[];
  newArrivalsLoading: boolean;
  newArrivalsError: any;
  
  topRatingReviews: Review[];
  topRatingReviewsLoading: boolean;
  topRatingReviewsError: any;
}

export const initialState: HomeState = {
  topSellingProducts: [],
  topSellingLoading: false,
  topSellingError: null,
  
  newArrivals: [],
  newArrivalsLoading: false,
  newArrivalsError: null,
  
  topRatingReviews: [],
  topRatingReviewsLoading: false,
  topRatingReviewsError: null
};

export const homeReducer = createReducer(
  initialState,

  on(HomeActions.loadTopSellingProducts, (state) => ({
    ...state,
    topSellingLoading: true,
    topSellingError: null
  })),

  on(HomeActions.loadTopSellingProductsSuccess, (state, { products }) => ({
    ...state,
    topSellingProducts: products,
    topSellingLoading: false,
    topSellingError: null
  })),

  on(HomeActions.loadTopSellingProductsFailure, (state, { error }) => ({
    ...state,
    topSellingProducts: [],
    topSellingLoading: false,
    topSellingError: error
  })),

  on(HomeActions.loadNewArrivals, (state) => ({
    ...state,
    newArrivalsLoading: true,
    newArrivalsError: null
  })),

  on(HomeActions.loadNewArrivalsSuccess, (state, { products }) => ({
    ...state,
    newArrivals: products,
    newArrivalsLoading: false,
    newArrivalsError: null
  })),

  on(HomeActions.loadNewArrivalsFailure, (state, { error }) => ({
    ...state,
    newArrivals: [],
    newArrivalsLoading: false,
    newArrivalsError: error
  })),

  on(HomeActions.loadTopRatingReviews, (state) => ({
    ...state,
    topRatingReviewsLoading: true,
    topRatingReviewsError: null
  })),

  on(HomeActions.loadTopRatingReviewsSuccess, (state, { reviews }) => ({
    ...state,
    topRatingReviews: reviews,
    topRatingReviewsLoading: false,
    topRatingReviewsError: null
  })),

  on(HomeActions.loadTopRatingReviewsFailure, (state, { error }) => ({
    ...state,
    topRatingReviews: [],
    topRatingReviewsLoading: false,
    topRatingReviewsError: error
  })),

  on(HomeActions.clearHomeData, () => initialState)
);
