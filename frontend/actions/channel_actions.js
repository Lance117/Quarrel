import * as ChannelAPIUtil from '../util/channels_api_util'

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';

export const receiveChannels = channels => ({
    type: RECEIVE_CHANNELS,
    channels
});

export const receiveChannel = channel => ({
    type: RECEIVE_CHANNEL,
    channel
});

// thunk action creators
export const fetchChannels = () => dispatch => (
    ChannelAPIUtil.fetchChannels().then(channels => (
        dispatch(receiveChannels(channels))
    ))
);