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
    this.handleDemoFromSignup=this.handleDemoFromSignup.bind(this);
  }

  componentDidMount(){
    this.props.clearErrors();
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }

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

  handleDemoFromSignup(e) {
    e.preventDefault;
    const demo = {
      username: 'demo',
      password: '123456'
    }
    this.props.login(demo)
      .then(() => { this.props.history.push('./routes') });
  }

  render() {
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <span id='navLink'>{this.props.navLink}</span>
          
          {this.props.formType == 'LOG IN' ? (
            <button className='demo-login' onClick={this.handleDemoLogin}>
              LOGIN WITH DEMO
                </button>
          ) : (
              <button className='demo-login' onClick={this.handleDemoFromSignup}>
                SIGNUP WITH DEMO
                </button>
          )}
          {this.renderErrors()}
          <span id='or'>  or </span>
          <div className="login-form">
            <br/>
            <input type="text"
                placeholder='Username'
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
              />
            <br/>
            <br/>
              <input type="password"
                placeholder='Password'
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            <br/>
            <br/>
            <input className="session-submit" type="submit" value={this.props.formType} />
            <br/>


          </div>
        </form>
      </div>
    );
  }
}

export default SessionForm;
