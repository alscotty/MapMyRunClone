import { combineReducers } from 'redux';

import users from './users_reducer';
import RoutesReducer from './routes_reducer';
import WorkoutsReducer from './workout_reducer'
import FollowsReducer from './follows_reducer'
import CommentsReducer from './comments_reducer';

export default combineReducers({
  users,
  routes: RoutesReducer,
  workouts: WorkoutsReducer,
  follows: FollowsReducer,
  comments: CommentsReducer
});
