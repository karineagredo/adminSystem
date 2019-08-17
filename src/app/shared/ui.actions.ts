import { Action } from "@ngrx/store";

export const ACTIVATE_LOADING = "[UI LOADING] Loading..";
export const DEACTIVATE_LOADING =
  "[UI DEACTIVATE LOADING] Deactivate Loading..";

export class ActivateLoadingAction implements Action {
  readonly type = ACTIVATE_LOADING;
}

export class DeactivateLoadingAction implements Action {
  readonly type = DEACTIVATE_LOADING;
}

export type actions = ActivateLoadingAction | DeactivateLoadingAction;
