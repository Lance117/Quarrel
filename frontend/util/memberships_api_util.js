export const fetchMemberships = () => (
    $.ajax({
        method: 'GET',
        url: '/api/memberships'
    })
)

export const createMembership = membership => (
    $.ajax({
        method: 'POST',
        url: '/api/memberships',
        data: { membership }
    })
)

export const removeMembership = membership => (
    $.ajax({
        method: "DELETE",
        url: `api/memberships/${membership.id}`
    })
)