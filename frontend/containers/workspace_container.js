import { connect } from 'react-redux'
import Workspace from '../components/workspace'
import { logoutUser } from '../actions/session_actions'
import { fetchChannels, createNewChannel } from '../actions/channel_actions'
import { fetchMessages, createNewMessage, deleteMessage, receiveMessage } from '../actions/message_actions'
import {fetchAllUsers} from '../actions/user_actions'
import {fetchAllMemberships, createNewMembership, deleteMembership} from '../actions/membership_actions'
import { withRouter } from 'react-router-dom';

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
        receiveMessage: message => dispatch(receiveMessage(message)),
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchAllMemberships: () => dispatch(fetchAllMemberships()),
        createMembership: membership => dispatch(createNewMembership(membership)),
        createChannel: channel => dispatch(createNewChannel(channel)),
        createMessage: message => dispatch(createNewMessage(message)),
        deleteMembership: membership => dispatch(deleteMembership(membership)),
        deleteMessage: message => dispatch(deleteMessage(message))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Workspace))