import { UserState, userAdapter } from '../adapters/user.adapter';
import { UsersActions, UserActionsTypes } from '../actions/user.actions';

export const initialState: UserState = {
  ids: [],
  entities: {},
};

export function usersReducer(
  state: UserState = initialState,
  action: UsersActions
) {
  switch (action.type) {
    case UserActionsTypes.LOAD_USERS_SUCCESS: {
      return userAdapter.addAll(action.users, state);
    }
    case UserActionsTypes.LOAD_USERS_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
}

/*
export const usersFeatureKey = 'users';

export interface UserState extends EntityState<User> {
  error: any
  selectedUser: User
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialUserState: UserState = userAdapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedUser: undefined
});

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.loadUsersSuccess,
    (state, action) => userAdapter.setAll(action.users, state)
  ),
  on(UserActions.loadUsersFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      }
    }
  )
);

export function reducerUser(state: UserState | undefined, action: Action){
  return userReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = userAdapter.getSelectors();
*/