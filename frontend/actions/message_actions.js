import {getMessages} from '../util/messages_api_util'

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_MESSAGES= 'RECEIVE_MESSAGES';

const receiveMessages = messages => ({
    type: RECEIVE_MESSAGES,
    messages
});

const receiveMessage = message => ({
    type: RECEIVE_MESSAGE,
    message
});

export const fetchMessages = () => dispatch => (
    getMessages().then(messages => (
        dispatch(receiveMessages(messages))
    ))
);