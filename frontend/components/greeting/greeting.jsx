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

  return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;
