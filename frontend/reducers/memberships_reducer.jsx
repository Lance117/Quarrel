import {RECEIVE_MEMBERSHIP, RECEIVE_MEMBERSHIPS, DELETE_MEMBERSHIP} from '../actions/membership_actions'

const membershipsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = {};

    switch (action.type) {
        case RECEIVE_MEMBERSHIPS:
            const memberships = Object.values(action.memberships);
            memberships.forEach(membership => {
                nextState[membership.id] = membership;
            });
            return nextState;
        case RECEIVE_MEMBERSHIP:
            const newMembership = { [action.membership.id]: action.membership };
            return Object.assign({}, state, newMembership);
        case DELETE_MEMBERSHIP:
            Object.assign(nextState, state);
            delete nextState[action.membership.id];
            return nextState;
        default:
            return state;
    }
};

export default membershipsReducer