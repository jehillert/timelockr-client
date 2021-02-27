import { combineReducers } from 'redux';
import entriesReducer from './entriesReducer';

export default combineReducers({
  entries: entriesReducer,
});
