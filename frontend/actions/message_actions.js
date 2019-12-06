import {getMessages, createMessage} from '../util/messages_api_util'

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_MESSAGES= 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE_ERRORS = 'RECEIVE_MESSAGE_ERRORS'

const receiveMessages = messages => ({
    type: RECEIVE_MESSAGES,
    messages
});

const receiveMessage = message => ({
    type: RECEIVE_MESSAGE,
    message
});

const receiveMessageErrors = (errors = []) => ({
    type: RECEIVE_MESSAGE_ERRORS,
    errors
});

export const fetchMessages = () => dispatch => (
    getMessages().then(messages => (
        dispatch(receiveMessages(messages))
    ))
);

export const createNewMessage = newMessage => dispatch => (createMessage(newMessage)
    .then(message => (
        dispatch(receiveMessage(message))
    ), err => (
        dispatch(receiveMessageErrors(err.responseJSON))
    ))
);