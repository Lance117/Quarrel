import {RECEIVE_CHANNEL, RECEIVE_CHANNELS, DELETE_CHANNEL} from '../actions/channel_actions'

const channelsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = {};

    switch (action.type) {
        case RECEIVE_CHANNELS:
            const channels = Object.values(action.channels);
            channels.forEach(channel => {
                nextState[channel.id] = channel;
            });
            return nextState;
        case RECEIVE_CHANNEL:
            const newChannel = { [action.channel.id]: action.channel };
            return Object.assign({}, state, newChannel);
        case DELETE_CHANNEL:
            Object.assign(nextState, state);
            delete nextState[action.channel.id];
            return nextState;
        default:
            return state;
    }
};

export default channelsReducer