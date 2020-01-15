import { combineReducers } from 'redux';

import users from './users_reducer';
<<<<<<< HEAD

export default combineReducers({
  users,
=======
import RoutesReducer from './routes_reducer';

export default combineReducers({
  users,
  routes: RoutesReducer
>>>>>>> Routes_directions_snap
});
