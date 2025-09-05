import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/models/product/product';
import { Review } from '../../shared/models/review/review';

export const loadTopSellingProducts = createAction(
  '[Home] Load Top Selling Products'
);

export const loadTopSellingProductsSuccess = createAction(
  '[Home] Load Top Selling Products Success',
  props<{ products: Product[] }>()
);

export const loadTopSellingProductsFailure = createAction(
  '[Home] Load Top Selling Products Failure',
  props<{ error: any }>()
);

export const loadNewArrivals = createAction(
  '[Home] Load New Arrivals'
);

export const loadNewArrivalsSuccess = createAction(
  '[Home] Load New Arrivals Success',
  props<{ products: Product[] }>()
);

export const loadNewArrivalsFailure = createAction(
  '[Home] Load New Arrivals Failure',
  props<{ error: any }>()
);

export const loadTopRatingReviews = createAction(
  '[Home] Load Top Rating Reviews'
);

export const loadTopRatingReviewsSuccess = createAction(
  '[Home] Load Top Rating Reviews Success',
  props<{ reviews: Review[] }>()
);

export const loadTopRatingReviewsFailure = createAction(
  '[Home] Load Top Rating Reviews Failure',
  props<{ error: any }>()
);

export const clearHomeData = createAction(
  '[Home] Clear Home Data'
);
