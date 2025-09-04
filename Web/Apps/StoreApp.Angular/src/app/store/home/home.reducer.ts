import { createReducer, on } from '@ngrx/store';
import { Product } from '../../shared/models/product/product';
import * as HomeActions from './home.actions';

export interface HomeState {
  topSellingProducts: Product[];
  topSellingLoading: boolean;
  topSellingError: any;
  
  newArrivals: Product[];
  newArrivalsLoading: boolean;
  newArrivalsError: any;
}

export const initialState: HomeState = {
  topSellingProducts: [],
  topSellingLoading: false,
  topSellingError: null,
  
  newArrivals: [],
  newArrivalsLoading: false,
  newArrivalsError: null
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

  on(HomeActions.clearHomeData, () => initialState)
);
