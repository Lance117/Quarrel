import { RECEIVE_USERS, RECEIVE_USER } from "../actions/user_actions";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = {};

    switch (action.type) {
        case RECEIVE_USERS:
            const users = Object.values(action.users);
            users.forEach(user => {
                nextState[user.id] = user;
            });
            return nextState;
        case RECEIVE_USER:
            const user = { [action.user.id]: action.user };
            return Object.assign({}, state, user);
        default:
            return state;
    }
};

export default usersReducer