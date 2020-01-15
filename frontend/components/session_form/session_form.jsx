import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin=this.handleDemoLogin.bind(this);
  }

  componentDidMount(){
    this.props.clearErrors();
  }

<<<<<<< HEAD
=======
  componentWillUnmount(){
    this.props.clearErrors();
  }

>>>>>>> Routes_directions_snap
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleDemoLogin(e){
    e.preventDefault;
    const demo={
      username:'demo',
      password:'123456'
    }
    this.props.processForm(demo)
      .then(()=>{this.props.history.push('./routes')});
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user)
      .then(()=>{this.props.history.push('./routes')});
  }

  renderErrors() {
    return(
      <ul className='login-errors'>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          Welcome to MapMyRunClone!
          <br/>
          <br/>
          Please {this.props.formType.toLowerCase()} or {this.props.navLink}
          {this.renderErrors()}
          <div className="login-form">
            <br/>
            <label>
              <input type="text"
                placeholder='Username'
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
              />
            </label>
            <br/>
            <br/>
            <label>
              <input type="password"
                placeholder='Password'
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <br/>
            <br/>
            <input className="session-submit" type="submit" value={this.props.formType} />
<<<<<<< HEAD
            
=======
            <br/>
>>>>>>> Routes_directions_snap
            {this.props.formType == 'LOG IN' ?  (
              <button  className='demo-login' onClick={this.handleDemoLogin}>
                DEMO LOGIN
                </button>
            ) : ('')}




          </div>
        </form>
      </div>
    );
  }
}

export default SessionForm;
