import { combineReducers } from 'redux';

import users from './users_reducer';
import RoutesReducer from './routes_reducer';
import WorkoutsReducer from './workout_reducer'

export default combineReducers({
  users,
  routes: RoutesReducer,
  workouts: WorkoutsReducer
});
