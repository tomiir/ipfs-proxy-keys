import Immutable from 'seamless-immutable';
import { createReducer, completeState, completeReducer } from 'redux-recompose';

import { actions } from './actions';
import { addNewKey, updateKeys } from './utils';

const initialState = {
  keys: []
};

const completedState = completeState(initialState);

const reducerDescription = {
  primaryActions: [actions.GET_KEYS, actions.CREATE_KEY, actions.UPDATE_KEY],
  override: {
    [actions.CREATE_KEY_SUCCESS]: addNewKey,
    [actions.UPDATE_KEY_SUCCESS]: updateKeys
  }
};

const reducer = createReducer(new Immutable(completedState), completeReducer(reducerDescription));

export default reducer;
