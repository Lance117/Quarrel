import * as ChannelAPIUtil from '../util/channels_api_util'

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL_ERRORS = 'RECEIVE_CHANNEL_ERRORS';

const receiveChannels = channels => ({
    type: RECEIVE_CHANNELS,
    channels
});

const receiveChannel = channel => ({
    type: RECEIVE_CHANNEL,
    channel
});

const receiveChannelErrors = (errors = []) => ({
    type: RECEIVE_CHANNEL_ERRORS,
    errors
});

// thunk action creators
export const fetchChannels = () => dispatch => (
    ChannelAPIUtil.fetchChannels().then(channels => (
        dispatch(receiveChannels(channels))
    ))
);

export const createNewChannel = newChannel => dispatch => (ChannelAPIUtil.createChannel(newChannel)
    .then(channel => (
        dispatch(receiveChannel(channel))
    ), err => (
        dispatch(receiveChannelErrors(err.responseJSON))
    ))
);

export const updateChannel = channel => dispatch => (ChannelAPIUtil.updateCh(channel)
    .then(channel => (
        dispatch(receiveChannel(channel))
    ), err => (
        dispatch(receiveChannelErrors(err.responseJSON))
    ))
);