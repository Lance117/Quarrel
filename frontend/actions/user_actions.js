import {fetchUsers } from '../util/users_api_util'

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})

export const fetchAllUsers = () => dispatch => (
    fetchUsers().then(users => (
        dispatch(receiveUsers(users))
    ))
);