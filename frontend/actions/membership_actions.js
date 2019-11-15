export const RECEIVE_MEMBERSHIP = 'RECEIVE_MEMBERSHIP';
export const RECEIVE_MEMBERSHIPS = 'RECEIVE_MEMBERSHIPS';

export const receiveMemberships = memberships => ({
    type: RECEIVE_MEMBERSHIPS,
    memberships
})

export const receiveMembership = membership => ({
    type: RECEIVE_MEMBERSHIP,
    membership
})