import { completeTypes, createTypes } from 'redux-recompose';

import { createKey, getKeys } from '~services/KeysService';

export const actions = createTypes(completeTypes(['GET_KEYS', 'CREATE_KEY']), '@@KEYS');

export const actionCreators = {
  getKeys: () => ({
    type: actions.GET_KEYS,
    target: 'keys',
    service: getKeys
  }),
  createKey: key => ({
    type: actions.CREATE_KEY,
    target: 'keys',
    payload: key,
    service: createKey
  })
};

export default actionCreators;
