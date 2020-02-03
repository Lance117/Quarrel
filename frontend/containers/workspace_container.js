import { connect } from 'react-redux'
import Workspace from '../components/workspace'
import { fetchChannels } from '../actions/channel_actions'
import { fetchMessages } from '../actions/message_actions'
import {fetchAllUsers, receiveUser} from '../actions/user_actions'
import {fetchAllMemberships} from '../actions/membership_actions'

const mapDispatchToProps = dispatch => ({
    fetchChannels: () => dispatch(fetchChannels()),
    fetchMessages: () => dispatch(fetchMessages()),
    receiveUser: user => dispatch(receiveUser(user)),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchAllMemberships: () => dispatch(fetchAllMemberships())
});

export default connect(null, mapDispatchToProps)(Workspace);