import { ActionReducerMap } from '@ngrx/store';

import * as slReducer from '../shopping-list/store/shopping-list.reducer';
import * as authReducer from '../auth/store/auth.reducer';

export interface AppState {
  shoppingList: slReducer.ShoppingListState;
  auth: authReducer.AuthState;
}


export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: slReducer.shoppingListReducer,
  auth: authReducer.authReducer
}
