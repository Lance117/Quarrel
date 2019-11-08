import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import SessionForm from './session_form'
import {signupUser} from '../actions/session_actions'

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.session,
        formType: 'signup'
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        processForm: user => dispatch(signupUser(user))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)