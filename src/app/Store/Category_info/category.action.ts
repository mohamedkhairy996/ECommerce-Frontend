import { createAction, props } from '@ngrx/store';

export const selectCategory = createAction(
  '[Category] Select',
  props<{ categoryId: number; categoryName: string }>()
);
