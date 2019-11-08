import { connect } from 'react-redux'
import SessionForm from './session_form'
import { loginUser } from '../actions/session_actions'
import Home from './home'

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.session,
        formType: 'login'
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        processForm: user => dispatch(loginUser(user))
    });
};

const containerCreator = connect(mapStateToProps, mapDispatchToProps);
const components = [SessionForm, Home];
export default components.map(containerCreator);