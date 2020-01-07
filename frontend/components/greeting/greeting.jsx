import React from 'react';
import { Link } from 'react-router-dom';



const Greeting = ({ currentUser, logout }) => {
  const sessionLinks = () => (
    <nav className="login-signup">
      <Link id='logLink' to="/login">Login</Link>
      &nbsp;or&nbsp;
      <Link id='signLink' to="/signup">Sign up</Link>
    </nav>
  );
  const personalGreeting = () => (
    <hgroup className="header-group">
      <h4 className="header-name"> Hi, {currentUser.username}! &nbsp;</h4>
      <button className="header-button" onClick={logout}>Log Out</button>
    </hgroup>
  );

  return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;
