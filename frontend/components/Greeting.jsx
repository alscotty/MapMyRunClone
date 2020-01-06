import React from 'react'
import {Link} from 'react-router-dom'

const Greeting = ({ currentUser, logout }) => {
    // console.log(currentUser)
    const display = currentUser ? (
        <div>
            <p>Hello, {currentUser.username}</p>
            <button onClick={logout}>Log Out</button>
        </div>
    ) : (
            <div>
                <Link className="btn" to="/signup">Sign Up</Link>
                <br/>
                <Link className="btn" to="/login">Log In</Link>
            </div>
        );

    return (
            <div>
                {display}
            </div>
    );
   
};


export default Greeting;



// const sessionLinks = () => (
//     <nav className="login-signup">
//         <Link to="/login">Login</Link>
//         &nbsp;or&nbsp;
//       <Link to="/signup">Sign up!</Link>
//     </nav>
// );
// const personalGreeting = () => (
//     <hgroup className="header-group">
//         <h2 className="header-name">Hi, {currentUser.username}!</h2>
//         <button className="header-button" onClick={logout}>Log Out</button>
//     </hgroup>
// );
// currentUser ? (console.log('yes')) : console.log('noo')
// return currentUser ? personalGreeting() : sessionLinks();