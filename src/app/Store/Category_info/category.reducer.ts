// store/store.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { StoreState } from '../../models/store-state';
import { clearStoreInfo, setStoreInfo } from './category.action';

export const initialState: StoreState = {
  storeId: null,
  color: null
};

export const storeReducer = createReducer(
  initialState,
  on(setStoreInfo, (state, { storeId, color }) => {
    console.log('[Store Reducer] setStoreInfo:', storeId, color);
    return {
    
    ...state,
    storeId,
    color
  };
}),
  on(clearStoreInfo, () => initialState)
);