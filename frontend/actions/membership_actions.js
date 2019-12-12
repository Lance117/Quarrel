import {fetchMemberships, createMembership, removeMembership} from '../util/memberships_api_util'

export const RECEIVE_MEMBERSHIP = 'RECEIVE_MEMBERSHIP';
export const RECEIVE_MEMBERSHIPS = 'RECEIVE_MEMBERSHIPS';
export const RECEIVE_MEMBERSHIP_ERRORS = 'RECEIVE_MEMBERSHIP_ERRORS';

const receiveMemberships = memberships => ({
    type: RECEIVE_MEMBERSHIPS,
    memberships
});

const receiveMembership = membership => ({
    type: RECEIVE_MEMBERSHIP,
    membership
});

const receiveErrors = (errors = []) => ({
    type: RECEIVE_MEMBERSHIP_ERRORS,
    errors
});

export const fetchAllMemberships = () => dispatch => (
    fetchMemberships().then(memberships => (
        dispatch(receiveMemberships(memberships))
    ))
);

export const createNewMembership = newMembership => dispatch => (createMembership(newMembership)
    .then(membership => (
        dispatch(receiveMembership(membership))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);