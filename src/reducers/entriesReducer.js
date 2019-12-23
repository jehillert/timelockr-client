// import { FETCH_ENTRIES, ADD_ENTRY } from '../actions/types';
import { FETCH_ENTRIES } from '../actions/types';

const initialState = {
  entries: [],
  entry: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ENTRIES:
      console.log('ACTION PAYLOAD ----------------------------------', action.payload);
      return {
        ...state,
        entries: action.payload,
      };
    default:
      return state;
  }
}
