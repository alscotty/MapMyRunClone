import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {

  const sessionLinks = () => (
    <nav className="login-signup">
      <Link id='logLink' to="/login">LOG IN</Link>
      &nbsp;
      <Link id='signLink' to="/signup">SIGN UP</Link>
    </nav>
  );
  const personalGreeting = () => (
    <hgroup className="header-group">
      <h4 className="header-name"> Hi, {currentUser.username}! &nbsp;</h4>
      <button className="header-button" onClick={logout}>LOG OUT</button>
    </hgroup>
  );

  return(
    <span>
      {currentUser ?
        <Link to="/activfeed" className="header-link">
        <h1>RapMyMun</h1>
      </Link>
      :
        <Link to="/" className="header-link">
          <h1>RapMyMun</h1>
        </Link>
      }

      <Link to='/routes/new' className='route-links'>
        Create Route
      </Link>
      <Link to='/routesAll' className='route-links'>
        Routes
      </Link>

      <Link to='/workouts/new' className='route-links'>
        Create Workout
      </Link>
      <Link to='/workoutsAll' className='route-links'>
        Workouts
      </Link> 


      <Link to='/community' className='route-links'>Community</Link>
      <Link to='/activfeed' className='route-links'>Activity Feed</Link>
      

      {currentUser ? personalGreeting() : sessionLinks()}
    </span>
  )

};


export default Greeting;
