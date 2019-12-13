import { RECEIVE_MEMBERSHIP_ERRORS, RECEIVE_MEMBERSHIP } from '../actions/membership_actions'

export default (state = [], action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_MEMBERSHIP_ERRORS:
            return action.errors;
        case RECEIVE_MEMBERSHIP:
            return [];
        default:
            return state;
    }
}