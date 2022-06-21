import * as slActions from './shopping-list.actions'
import { Ingredient } from '../../shared/ingredient.model'

export type ShoppingListState = {
  ingredients: Ingredient[],
  editedItemIndex: number;
}

const initalState = {
  ingredients: [new Ingredient('Test', 1)],
  editedItemIndex: -1
}

export function shoppingListReducer(state = initalState, action: slActions.ActionTypes) {
  const updatedState = { ...state }
  const ingredientsCopy = []
  for(let ing of state.ingredients) {
    ingredientsCopy.push(new Ingredient(ing.name, ing.amount))
  }
  updatedState.ingredients = ingredientsCopy;

  switch(action.type) {
    case slActions.ADD_INGREDIENT:
      updatedState.ingredients.push(action.payload)
      return updatedState;

    case slActions.ADD_INGREDIENTS:
      updatedState.ingredients.push(...action.payload)
      return updatedState;

    case slActions.UPDATE_INGREDIENT:
      updatedState.ingredients[action.payload.index] = action.payload.ingredient
      return updatedState;

    case slActions.DELETE_INGREDIENT:
      updatedState.ingredients.splice(action.payload, 1)
      return updatedState;

    case slActions.SELECT_INGREDIENT:
      updatedState.editedItemIndex = action.payload;
      return updatedState;

    default:
      return updatedState;
  }

}
