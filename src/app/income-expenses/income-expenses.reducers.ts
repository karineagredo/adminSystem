import * as fromIncomeExpense from "./income-expenses.actions";
import { IncomeExpenses, IncomeExpensesModel } from "./income-expenses.model";
import { Action } from "rxjs/internal/scheduler/Action";
import { actions } from "../shared/ui.actions";
import { from } from "rxjs";

export interface IncomeExpensesState {
  items: IncomeExpensesModel[];
}

const initialState: IncomeExpensesState = {
  items: []
};

export function incomeExpensesReducer(
  state = initialState,
  action: fromIncomeExpense.itemsActions
): IncomeExpensesState {
  switch (action.type) {
    case fromIncomeExpense.SET_ITEMS:
      return {
        items: action.itemsList
      };
    case fromIncomeExpense.UNSET_ITEMS:
      return {
        items: []
      };
    default:
      return state;
  }
}
