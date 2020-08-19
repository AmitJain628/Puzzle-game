import produce from 'immer';
import { AnyAction } from 'redux';

export default (initialState: () => object, reducers: object) => {
  return produce((state = initialState(), { type, payload }: AnyAction) => {
    if (reducers[type]) {
      reducers[type](state, payload);
    }

    return state;
  });
};
