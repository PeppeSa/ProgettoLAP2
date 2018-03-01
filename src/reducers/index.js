import { combineReducers } from 'redux';
import MapReducer from './MapReducer';
import AuthReducer from './AuthReducer';
import NotifyReducer from './NotifyReducer';

const appReducer = combineReducers({
  map: MapReducer,
  auth: AuthReducer,
  notify: NotifyReducer
});

export default appReducer;
