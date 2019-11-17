import { connect } from 'react-redux'
import SessionForm from './session_form'
import { loginUser } from '../actions/session_actions'
import Home from './home'
import {fetchChannels} from '../actions/channel_actions'
import {fetchAllMemberships} from '../actions/membership_actions'

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.session,
        formType: 'login'
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        processForm: user => dispatch(loginUser(user)),
        fetchChannels: () => dispatch(fetchChannels()),
        fetchAllMemberships: () => dispatch(fetchAllMemberships())
    });
};

const containerCreator = connect(mapStateToProps, mapDispatchToProps);
const components = [SessionForm, Home];
export default components.map(containerCreator);