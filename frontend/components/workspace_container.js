import { connect } from 'react-redux'
import Sidebar from './sidebar'
import TopNav from './top_nav'
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

export const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)
export const TopNavContainer = connect(mapStateToProps, mapDispatchToProps)(TopNav)