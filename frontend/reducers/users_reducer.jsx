import { RECEIVE_USERS } from "../actions/user_actions";

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
        default:
            return state;
    }
};

export default usersReducer