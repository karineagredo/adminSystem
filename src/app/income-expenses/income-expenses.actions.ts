import { Action } from "@ngrx/store";
import { IncomeExpensesModel } from "./income-expenses.model";

export const SET_ITEMS = "[Income Expenses] Set Items";
export const UNSET_ITEMS = "[Income Expenses] UnSet Items";

export class setItemsAction implements Action {
  readonly type = SET_ITEMS;

  constructor(public itemsList: IncomeExpensesModel[]) {}
}

export class unSetItemsAction implements Action {
  readonly type = UNSET_ITEMS;
}

export type itemsActions = setItemsAction | unSetItemsAction;
