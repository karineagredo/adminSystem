import * as uiActions from "./shared/ui.reducers";
import { ActionReducerMap } from "@ngrx/store";
import * as authReducer from "./auth/auth.reducers";

export interface AppState {
  ui: uiActions.State;
  auth: authReducer.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiActions.uiReducer,
  auth: authReducer.authReducer
};
