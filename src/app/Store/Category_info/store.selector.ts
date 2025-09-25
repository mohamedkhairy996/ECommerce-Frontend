// store/store.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreState } from '../../models/store-state';


const getStoreFeatureState = createFeatureSelector<StoreState>('selectedStore');

export const getStoreId = createSelector(
  getStoreFeatureState,
  (state) => state.storeId
);

export const getColor = createSelector(
  getStoreFeatureState,
  (state) => state.color
);