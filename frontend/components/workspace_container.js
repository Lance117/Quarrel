import { connect } from 'react-redux'
import Workspace from './workspace'
import { logoutUser } from '../actions/session_actions'
import { fetchChannels } from '../actions/channel_actions'
import { fetchMessages } from '../actions/message_actions'
import {fetchAllUsers} from '../actions/user_actions'
import {fetchAllMemberships} from '../actions/membership_actions'

const mapStateToProps = (state, ownProps) => {
    const currentUser = state.session.username;
    const userId = state.session.id;
    const activeChannel = {id: parseInt(ownProps.match.params.channelId)};
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
        fetchMessages: () => dispatch(fetchMessages()),
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchAllMemberships: () => dispatch(fetchAllMemberships())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)