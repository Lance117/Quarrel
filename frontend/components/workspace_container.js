import { connect } from 'react-redux'
import Sidebar from './sidebar'
import TopNav from './top_nav'
import PrimaryView from './primary_view'
import { logoutUser } from '../actions/session_actions'
import { fetchChannels } from '../actions/channel_actions'
import { receiveActiveChannel } from '../actions/active_channel_actions'
import { fetchMessages } from '../actions/message_actions'

const mapStateToProps = state => {
    const currentUser = state.entities.users[state.session.id];
    const activeChannel = state.ui.activeChannel;
    const messages = state.entities.messages;
    return { currentUser, activeChannel, messages };
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        fetchChannels: () => dispatch(fetchChannels()),
        setActiveChannel: channel => dispatch(receiveActiveChannel(channel)),
        fetchMessages: () => dispatch(fetchMessages())
    };
}

export const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)
export const TopNavContainer = connect(mapStateToProps, mapDispatchToProps)(TopNav)
export const PrimaryViewContainer = connect(mapStateToProps, mapDispatchToProps)(PrimaryView)