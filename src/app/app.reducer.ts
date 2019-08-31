import * as uiActions from "./shared/ui.reducers";
import { ActionReducerMap } from "@ngrx/store";
import * as authReducer from "./auth/auth.reducers";
import * as incomeExpense from "./income-expenses/income-expenses.reducers";

export interface AppState {
  ui: uiActions.State;
  auth: authReducer.AuthState;
  incomeExpense: incomeExpense.IncomeExpensesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiActions.uiReducer,
  auth: authReducer.authReducer,
  incomeExpense: incomeExpense.incomeExpensesReducer
};
