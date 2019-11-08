import { connect } from 'react-redux'
import Sidebar from './sidebar'
import { logoutUser } from '../actions/session_actions'

const mapStateToProps = state => {
    const currentUser = state.entities.users[state.session.id];
    return { currentUser };
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)