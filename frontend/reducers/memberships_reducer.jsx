import {RECEIVE_MEMBERSHIP, RECEIVE_MEMBERSHIPS} from '../actions/membership_actions'

const membershipsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = {};

    switch (action.type) {
        case RECEIVE_MEMBERSHIPS:
            action.memberships.forEach(membership => {
                nextState[membership.id] = membership;
            });
            return nextState;
        case RECEIVE_MEMBERSHIP:
            const newMembership = { [action.membership.id]: action.membership };
            return Object.assign({}, state, newMembership);
        default:
            return state;
    }
};

export default membershipsReducer