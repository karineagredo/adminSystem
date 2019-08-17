import * as uiActions from "./ui.actions";

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function uiReducer(
  state = initialState,
  action: uiActions.actions
): State {
  switch (action.type) {
    case uiActions.ACTIVATE_LOADING:
      return {
        isLoading: true
      };
    case uiActions.DEACTIVATE_LOADING:
      return {
        isLoading: false
      };

    default:
      return state;
  }
}
