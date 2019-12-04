import { connect } from 'react-redux'
import Workspace from './workspace'
import { logoutUser } from '../actions/session_actions'
import { fetchChannels } from '../actions/channel_actions'
import { receiveActiveChannel } from '../actions/active_channel_actions'
import { fetchMessages } from '../actions/message_actions'
import {fetchAllUsers} from '../actions/user_actions'
import {fetchAllMemberships} from '../actions/membership_actions'

const mapStateToProps = state => {
    const currentUser = state.session.username;
    const userId = state.session.id;
    const activeChannel = state.ui.activeChannel;
    const messages = state.entities.messages;
    const users = state.entities.users;
    const memberships = Object.values(state.entities.memberships);
    const channels = state.entities.channels;
    return { currentUser, activeChannel, messages, users, channels, memberships, userId };
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        fetchChannels: () => dispatch(fetchChannels()),
        setActiveChannel: channel => dispatch(receiveActiveChannel(channel)),
        fetchMessages: () => dispatch(fetchMessages()),
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchAllMemberships: () => dispatch(fetchAllMemberships())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)