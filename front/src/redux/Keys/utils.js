export const addNewKey = (state, action) =>
  state.merge({
    keys: [...state.keys, action.payload],
    keysLoading: false
  });

export const updateKeys = (state, action) =>
  state.merge({
    keys: [...state.keys.map(key => (key.id === action.payload.id ? action.payload : key))],
    keysLoading: false
  });
