import { combineReducers } from 'redux';
import favoriteReducer from './favoriteReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  favoriteReducer: favoriteReducer,
});
export default rootReducer;