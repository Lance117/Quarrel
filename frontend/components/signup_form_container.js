import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import SessionForm from './session_form'
import {signupUser} from '../actions/session_actions'
import {fetchChannels} from '../actions/channel_actions'
import {fetchAllMemberships} from '../actions/membership_actions'

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.session,
        formType: 'signup'
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        processForm: user => dispatch(signupUser(user)),
        fetchChannels: () => dispatch(fetchChannels()),
        fetchAllMemberships: () => dispatch(fetchAllMemberships())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)