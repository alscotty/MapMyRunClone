import { combineReducers } from 'redux';

import session from './session_errors_reducer';
<<<<<<< HEAD

export default combineReducers({
  session
=======
import RouteErrorsReducer from './routes_errors_reducer'

export default combineReducers({
  session,
  routes: RouteErrorsReducer
>>>>>>> Routes_directions_snap
});
