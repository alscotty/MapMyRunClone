import SessionForm from './SessionForm'
import {connect} from 'react-redux'
import {login} from '../actions/session_actions'
import {Link} from 'react-router-dom'
import React from 'react'

const mSTP=(state,ownProps)=>({
    errors: state.errors.session,
    formType: 'login',
    navLink: <Link to='/signup'>Sign Up Instead</Link>
});

const mDTP = dispatch => ({
    processForm: (user) => dispatch(login(user)),
});

export default connect(mSTP,mDTP)(SessionForm);