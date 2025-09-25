// store/store.actions.ts
import { createAction, props } from '@ngrx/store';

export const setStoreInfo = createAction(
  '[Store] Set Store Info',
  props<{ storeId: number; color: string }>()
);

export const clearStoreInfo = createAction('[Store] Clear Store Info');