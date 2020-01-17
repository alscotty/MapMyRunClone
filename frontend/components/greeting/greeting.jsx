import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {

  const sessionLinks = () => (
    <span>
      <Link to="/" className="header-link">
        <h1>RapMyMun</h1>
      </Link>
    <h1>HELLO</h1>
      <Link to='/routes/new' className='route-links'>
        Create Route
      </Link>
      <Link to='/routes' className='route-links'>
        Routes
      </Link>
      <Link to='/workouts/new' className='route-links'>
        Create Workout
      </Link>
      <Link to='/workouts' className='route-links'>
        Workouts
      </Link>

    <nav className="login-signup">
      <Link id='logLink' to="/login">LOG IN</Link>
      &nbsp;
      <Link id='signLink' to="/signup">SIGN UP</Link>
    </nav>
    </span>

  );
  const personalGreeting = () => (
    <span>
      <Link to="/routes" className="header-link">
        <h1>RapMyMun</h1>
      </Link>
    <h1>HELLO</h1>

      <Link to='/routes/new' className='route-links'>
        Create Route
      </Link>
      <Link to='/routes' className='route-links'>
        Routes
      </Link>
      <Link to='/workouts/new' className='route-links'>
        Create Workout
      </Link>
      <Link to='/workouts' className='route-links'>
        Workouts
      </Link>

    <hgroup className="header-group">

      <h4 className="header-name"> Hi, {currentUser.username}! &nbsp;</h4>
      <button className="header-button" onClick={logout}>LOG OUT</button>
    </hgroup>
    </span>
  );

  return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;
