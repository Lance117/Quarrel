import {RECEIVE_CHANNEL, RECEIVE_CHANNELS} from '../actions/channel_actions'

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
        default:
            return state;
    }
};

export default channelsReducer