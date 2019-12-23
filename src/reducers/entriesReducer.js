import * as Debug from 'debug';
import { FETCH_ENTRIES, ADD_ENTRY } from 'types';

const debug = Debug('src:entries-reducer');

const initialState = {
  entries: [],
  entry: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ENTRIES:
      debug('ACTION PAYLOAD ----------------------------------', action.payload);
      return {
        ...state,
        entries: action.payload,
      };
    case ADD_ENTRY:
      return {
        ...state,
        entry: action.payload,
      }
    default:
      return state;
  }
}
