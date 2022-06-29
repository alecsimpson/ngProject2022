import { User } from "../user.model"
import * as authActions from "./auth.actions"


export type AuthState = {
  user: User
}

const initialState = {
  user: null
}


export function authReducer(state = initialState, action: authActions.ActionTypes) {
  const updatedState = { ...state }

  switch(action.type) {
    case authActions.LOGIN:
      updatedState.user = new User(action.payload.email, action.payload.id, action.payload.token, action.payload.tokenExpirationDate);
      localStorage.setItem('userData', JSON.stringify(updatedState.user))
      return updatedState;

    case authActions.LOGOUT:
      updatedState.user = null;
      localStorage.removeItem('userData')
      return updatedState;

    default:
      return updatedState;
  }

}
