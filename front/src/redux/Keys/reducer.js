import Immutable from 'seamless-immutable';
import { createReducer, completeState, completeReducer } from 'redux-recompose';

import { actions } from './actions';

const initialState = {
  keys: []
};

const completedState = completeState(initialState);

const reducerDescription = {
  primaryActions: [actions.GET_KEYS, actions.CREATE_KEY],
  override: {
    [actions.CREATE_KEY_SUCCESS]: (state, action) =>
      state.merge({
        keys: [...state.keys, action.payload],
        keysLoading: false
      })
  }
};

const reducer = createReducer(new Immutable(completedState), completeReducer(reducerDescription));

export default reducer;
