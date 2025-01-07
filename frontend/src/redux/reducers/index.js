import { combineReducers } from 'redux';
import user from '../actions/user';

const rootReducer = combineReducers({
  user,
});

export default rootReducer;