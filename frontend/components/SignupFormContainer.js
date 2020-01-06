import SessionForm from './SessionForm'
import { connect } from 'react-redux'
import {signup} from '../actions/session_actions'
import {Link} from 'react-router-dom'
import React from 'react'

const mSTP = (state,ownProps) => ({
    errors: state.errors.session,
    formType:'signup',
    navLink: <Link to="/login">log in instead</Link>,

});

const mDTP = dispatch => ({
    processForm: (user)=> dispatch(signup(user))
});

export default connect(mSTP, mDTP)(SessionForm);