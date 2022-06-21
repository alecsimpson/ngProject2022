import { ActionReducerMap } from '@ngrx/store';

import * as slReducer from '../shopping-list/store/shopping-list.reducer';

export interface AppState {
  shoppingList: slReducer.ShoppingListState;
}


export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: slReducer.shoppingListReducer
}
