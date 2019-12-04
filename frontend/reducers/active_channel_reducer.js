import {RECEIVE_ACTIVE_CHANNEL} from '../actions/active_channel_actions'


export default (state = {id: 1, channelName: ''}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ACTIVE_CHANNEL:
            return {id: action.channel.id, channelName: action.channel.channel_name};
        default:
            return state;
    }
};