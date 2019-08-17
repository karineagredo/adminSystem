import { SetUserAction, actions, SET_USER } from "./auth.actions";
import { User } from "./user.model";

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null
};
export function authReducer(state = initialState, action: actions): AuthState {
  switch (action.type) {
    case SET_USER:
      return {
        user: { ...action.user }
      };
    default:
      return state;
  }
}
