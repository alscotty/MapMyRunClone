import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import GreetingContainer from './greeting/greeting_container';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import RoutesIndex from './routes/routes_index_container'
import RoutesForm from './routes/routes_form_container'
import RouteShow from './routes/route_show_container'
import Splash from './splash page/splash_page'
import Footer from './footer/footer'
import WorkoutForm from './workouts/workouts_form_container'
import WorkoutsIndex from './workouts/workouts_index_container'
import WorkoutRouteForm from './workouts/workout_route_form_container'
import CommunityContainer from './community/community_container'
import ActivityFeedContainer from './community/activity_feed_container'
import EditWorkoutRouteContainer from './workouts/edit_workout_route_form_container'
import EditWorkoutContainer from './workouts/edit_workout_form_container'

import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <header>
      <GreetingContainer />
    </header>

    <Route exact path='/' component={Splash}/>
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <Switch>
        <ProtectedRoute exact path='/routes' component={RoutesIndex} />
        <ProtectedRoute exact path='/routes/new' component={RoutesForm} />
        <ProtectedRoute exact path='/routes/:routeId' component={RouteShow} />
      </Switch>
      <ProtectedRoute exact path='/routes/:routeId/workout' component={WorkoutRouteForm} />

      <ProtectedRoute exact path='/workouts' component={WorkoutsIndex}/>
      <ProtectedRoute exact path='/workouts/new' component={WorkoutForm} />
      <Switch>
        <ProtectedRoute path='/workouts/edit/:workoutId/route/:routeId' component={EditWorkoutRouteContainer}/>
        <ProtectedRoute path='/workouts/edit/:workoutId' component={EditWorkoutContainer}/>
      </Switch>

      <ProtectedRoute exact path='/community' component={CommunityContainer}/>
      <ProtectedRoute exact path='/activfeed' component={ActivityFeedContainer}/>
    <footer>
      <Footer/>
      
    </footer>
  </div>
);

export default App;
