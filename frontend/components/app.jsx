import React from "react";
import GreetingContainer from './GreetingContainer'
import LoginFormContainer from "./LoginFormContainer";
import SignupFormContainer from "./SignupFormContainer";
import {Route} from 'react-router-dom'
import {AuthRoute} from '../util/route_utl'

const App = () => (
    <div>
        <header>
        <h1>MapMyRunClone</h1>
        <GreetingContainer/>
        </header>
        <AuthRoute path='/login' component={LoginFormContainer}/>
        <AuthRoute path='/signup' component={SignupFormContainer}/>
    </div>
);

export default App;