import { UsersActions, UserActionsTypes } from '../actions/user.actions';
import { UserState, userAdapter } from '../adapters/user.adapter';

export const initialState: UserState = {
  ids: [],
  entities: {},
};

export function usersReducer(
  state: UserState = initialState,
  action: UsersActions
) {
  switch (action.type) {
    case UserActionsTypes.ADD_USER_SUCCESS: {
      return userAdapter.addOne(action.user, state);
    }
    case UserActionsTypes.ADD_USER_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    case UserActionsTypes.LOAD_USERS_SUCCESS: {
      return userAdapter.setAll(action.users, state);
    }
    case UserActionsTypes.LOAD_USERS_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    case UserActionsTypes.LOAD_USER_SUCCESS: {
      return {
        ...state,
        selectedUser: action.selectedUser,
      };
    }
    case UserActionsTypes.LOAD_USER_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    case UserActionsTypes.UPDATE_USER: {
      return userAdapter.updateOne(action.user, state);
    }
    case UserActionsTypes.DELETE_USER_SUCCESS: {
      return userAdapter.removeOne(action.id, state);
    }
    case UserActionsTypes.DELETE_USER_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
}