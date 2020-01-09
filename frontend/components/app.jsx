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
import RoutesIndex from '../components/routes/routes_index_container'
import Splash from './splash page/splash_page'

import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <header>
      <Link to="/" className="header-link">
        <h1>MapMyRunClone</h1>
      </Link>
      
      <GreetingContainer />
    </header>

    <Route exact path='/' component={Splash}/>
    <Switch>
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <ProtectedRoute path='/routes' component={RoutesIndex} />
    </Switch>
    
  </div>
);

export default App;
