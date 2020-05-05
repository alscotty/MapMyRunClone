import React from 'react';
import { Link } from 'react-router-dom';

class Greeting extends React.Component{
  constructor(props){
    super(props);

    this.sessionLinks=this.sessionLinks.bind(this);
    this.personalGreeting=this.personalGreeting.bind(this);
  }

  sessionLinks(){
    return(
    <nav className="login-signup">
      <Link id='logLink' to="/login">LOG IN</Link>
      &nbsp;
      <Link id='signLink' to="/signup">SIGN UP</Link>
    </nav>
    )
  };
  
  personalGreeting(){
    const {currentUser, logout} = this.props;
    return(
    <hgroup className="header-group">
      <h4 className="header-name"> Hi, {currentUser.username}! &nbsp;</h4>
      <button className="header-button" onClick={logout}>LOG OUT</button>
    </hgroup>
    )
  };

  toggle(){
    document.getElementById("myDropdown").classList.toggle("show");
  }

  routeToggle(){
    document.getElementById("routeDropdown").classList.toggle("show");
  }

  componentDidMount(){
    window.addEventListener('click', () => {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
    } 
        if(!event.target.matches('.routedropbtn')){
        var dropdowns = document.getElementsByClassName("route-dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
    }
  });
}

  render(){
    const {currentUser} = this.props
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

      <Link to='/activfeed' className='route-links'>Activity Feed</Link>


      {/* <Link to='/routes/new' className='route-links'>
        Create Route
      </Link>
      <Link to='/routesAll' className='route-links'>
        Routes
      </Link> */}

      <span className='route-dropdown'>
        <span onClick={() => this.routeToggle()} className='routedropbtn'>Routes</span>
        <div id='routeDropdown' className='route-dropdown-content'>
          <li>
            <Link to='/routes/new' className='route-links'>
              Create Route
            </Link>
          </li>
          <li>
            <Link to='/routesAll' className='route-links'>
              My Routes
            </Link>
          </li>
        </div>
      </span>



      <span className='dropdown'>
        <span onClick={()=>this.toggle()} className='dropbtn'>Workouts</span>
        <div id='myDropdown' className='dropdown-content'>
          <li>
            <Link className='dropdown' to='/workouts/new' className='route-links'>
            Create Workout
            </Link>
          </li>
          <li>
          <Link className='dropdown' to='/workoutsAll' className='route-links'>
            My Workouts
          </Link> 
          </li>
        </div>
      </span>



      <Link to='/community' className='route-links'>Community</Link>
      

      {currentUser ? this.personalGreeting() : this.sessionLinks()}
    </span>
  )

    }

}

export default Greeting;
