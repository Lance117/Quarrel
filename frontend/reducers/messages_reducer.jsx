import { RECEIVE_MESSAGE, RECEIVE_MESSAGES, DELETE_MESSAGE } from '../actions/message_actions'

const messagesReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = {};

    switch (action.type) {
        case RECEIVE_MESSAGES:
            const messages = Object.values(action.messages);
            messages.forEach(message => {
                nextState[message.id] = message;
            });
            return nextState;
        case RECEIVE_MESSAGE:
            const newMessage = { [action.message.id]: action.message };
            return Object.assign({}, state, newMessage);
        case DELETE_MESSAGE:
            Object.assign(nextState, state);
            delete nextState[action.message.id];
            return nextState;
        default:
            return state;
    }
};

export default messagesReducer; 